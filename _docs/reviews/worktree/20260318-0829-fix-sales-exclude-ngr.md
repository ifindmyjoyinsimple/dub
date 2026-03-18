# Code Review: fix-sales-exclude-ngr

**Date**: 2026-03-18
**Branch**: fix-sales-exclude-ngr
**Reviewer**: Claude (sonnet, automated worktree review)
**Changed files**: 1 code file reviewed

## Summary

This branch adds NGR (Net Gaming Revenue) as a separate event type in the group-by analytics pipe, excludes `daily_ngr` events from the regular `group_by_sales` node to avoid double-counting, and introduces a new `group_by_ngr` node joined into the composite view. The exclusion fix and composite join logic are correct. However, the new `group_by_ngr` node is missing the `filters` parameter block that all sibling nodes implement, which will cause silent filter-bypass bugs.

## Findings

### P1 — Critical (0)

None.

### P2 — Important (1)

### `group_by_ngr` silently ignores the `filters` parameter
**Severity**: P2-IMPORTANT
**Confidence**: 75
**Category**: A. Logic Bugs
**File**: `packages/tinybird/pipes/v4_group_by.pipe:820`
**Evidence**:
```sql
-- group_by_sales (lines 646-754): has a full filters block
{% if defined(filters) %}
    {% for item in JSON(filters, '[]') %}
        -- handles metadata.*, country, city, domain, tagId, folderId, UTM params, etc.
    {% end %}
{% end %}

-- group_by_ngr (lines 820-865): completely absent
FROM dub_sale_events_mv
WHERE
    event_name = 'daily_ngr'
    {% if defined(workspaceId) %} AND workspace_id = {{ workspaceId }} {% end %}
    -- ...basic dimension filters only, no `filters` block at all  <-- HERE
    {% if defined(end) %} AND timestamp <= {{ DateTime(end) }} {% end %}
AND groupByField != '' AND groupByField != 'Unknown'
```
**Problem**: When callers pass the `filters` parameter (metadata field filters, domain, tagId, folderId, UTM filters), those conditions are applied to `group_by_sales` but silently skipped for `group_by_ngr`. In the `composite` event type, this produces a split result: sales are correctly filtered while NGR rows are not, inflating NGR figures for any filtered analytics view.
**Recommended Fix**:
```sql
-- Add the same filters block to group_by_ngr's WHERE clause
-- before the `AND groupByField != ''` line, mirroring the
-- group_by_sales implementation (lines 646-754) but without
-- the `se.` alias prefix (group_by_ngr queries dub_sale_events_mv directly).
{% if defined(filters) %}
    {% for item in JSON(filters, '[]') %}
        -- same metadata.* and field-based filter logic
    {% end %}
{% end %}
```

### P3 — Suggestions (1)

### `groupByField` alias filtered in WHERE without subquery
**Severity**: P3-SUGGESTION
**Confidence**: 62
**Category**: A. Logic Bugs
**File**: `packages/tinybird/pipes/v4_group_by.pipe:866`
**Evidence**:
```sql
-- group_by_sales uses a subquery so groupByField alias is safe to filter:
FROM (...) AS typed
WHERE
    groupByField != '' AND groupByField != 'Unknown'  -- outer WHERE on alias

-- group_by_ngr references the alias directly in the same WHERE level:
SELECT multiIf(...) AS groupByField, ...
FROM dub_sale_events_mv
WHERE
    event_name = 'daily_ngr'
    ...
AND groupByField != '' AND groupByField != 'Unknown'  -- <-- HERE, no subquery
```
**Problem**: `group_by_sales` wraps its SELECT in a subquery (`FROM (...) AS typed`) specifically to allow safe filtering on the `groupByField` alias. `group_by_ngr` skips the subquery and filters the alias directly in the WHERE. ClickHouse generally resolves SELECT aliases before WHERE evaluation, so this likely works, but it diverges from the established pattern and may behave differently in certain Tinybird execution contexts.
**Recommended Fix**:
```sql
-- Wrap the SELECT in a subquery and filter in the outer WHERE,
-- matching the group_by_sales pattern:
FROM (
    SELECT multiIf(...) AS groupByField, ...
    FROM dub_sale_events_mv
    WHERE event_name = 'daily_ngr'
    -- ... all dimension and time filters
) AS typed
WHERE groupByField != '' AND groupByField != 'Unknown'
```
