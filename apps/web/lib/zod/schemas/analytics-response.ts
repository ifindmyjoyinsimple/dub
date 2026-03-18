import { TRIGGER_TYPES } from "@/lib/analytics/constants";
import { CONTINENT_CODES } from "@dub/utils";
import * as z from "zod/v4";
import { LinkTagSchema } from "./tags";
import { centsSchemaWithDefault } from "./utils";

const analyticsTriggersResponse = z.object({
  trigger: z
    .enum(TRIGGER_TYPES)
    .describe("The type of trigger method: link click or QR scan"),
  clicks: z
    .number()
    .describe("The number of clicks from this trigger method")
    .default(0),
  leads: z
    .number()
    .describe("The number of leads from this trigger method")
    .default(0),
  sales: z
    .number()
    .describe("The number of sales from this trigger method")
    .default(0),
  saleAmount: centsSchemaWithDefault.describe(
    "The total amount of sales from this trigger method, in cents",
  ),
  ngr: z.coerce.number().describe("The number of NGR events from this trigger method").default(0),
  ngrAmount: z.coerce.number().describe("The total NGR amount from this trigger method, in satang").default(0),
});

export const analyticsResponse = {
  count: z.object({
    clicks: z.coerce.number().describe("The total number of clicks").default(0),
    leads: z.coerce.number().describe("The total number of leads").default(0),
    sales: z.coerce.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales, in cents",
    ),
    ngr: z.coerce.number().describe("The total number of NGR events").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount, in satang").default(0),
  }),

  timeseries: z.object({
    start: z.string().describe("The starting timestamp of the interval"),
    clicks: z
      .number()
      .describe("The number of clicks in the interval")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads in the interval")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales in the interval")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales in the interval, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events in the interval").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount in the interval, in satang").default(0),
  }),

  continents: z.object({
    continent: z
      .enum(CONTINENT_CODES)
      .describe(
        "The 2-letter ISO 3166-1 code representing the continent associated with the location of the user.",
      ),
    clicks: z
      .number()
      .describe("The number of clicks from this continent")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this continent")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this continent")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this continent, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this continent").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this continent, in satang").default(0),
  }),

  countries: z.object({
    country: z
      .string()
      .describe(
        "The 2-letter ISO 3166-1 country code of the country. Learn more: https://d.to/geo",
      ),
    region: z.literal("*").default("*"),
    city: z.literal("*").default("*"),
    clicks: z
      .number()
      .describe("The number of clicks from this country")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this country")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this country")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this country, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this country").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this country, in satang").default(0),
  }),

  regions: z.object({
    country: z
      .string()
      .describe(
        "The 2-letter ISO 3166-1 country code of the country. Learn more: https://d.to/geo",
      ),
    region: z
      .string()
      .describe("The 2-letter ISO 3166-2 region code of the region."),
    city: z.literal("*").default("*"),
    clicks: z
      .number()
      .describe("The number of clicks from this region")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this region")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this region")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this region, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this region").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this region, in satang").default(0),
  }),

  cities: z.object({
    country: z
      .string()
      .describe(
        "The 2-letter ISO 3166-1 country code of the country where this city is located. Learn more: https://d.to/geo",
      ),
    region: z
      .string()
      .describe(
        "The 2-letter ISO 3166-2 region code representing the region associated with the location of the user.",
      ),
    city: z.string().describe("The name of the city"),
    clicks: z
      .number()
      .describe("The number of clicks from this city")
      .default(0),
    leads: z.number().describe("The number of leads from this city").default(0),
    sales: z.number().describe("The number of sales from this city").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this city, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this city").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this city, in satang").default(0),
  }),

  devices: z.object({
    device: z.string().describe("The name of the device"),
    clicks: z
      .number()
      .describe("The number of clicks from this device")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this device")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this device")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this device, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this device").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this device, in satang").default(0),
  }),

  browsers: z.object({
    browser: z.string().describe("The name of the browser"),
    clicks: z
      .number()
      .describe("The number of clicks from this browser")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this browser")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this browser")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this browser, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this browser").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this browser, in satang").default(0),
  }),

  os: z.object({
    os: z.string().describe("The name of the OS"),
    clicks: z.number().describe("The number of clicks from this OS").default(0),
    leads: z.number().describe("The number of leads from this OS").default(0),
    sales: z.number().describe("The number of sales from this OS").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this OS, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this OS").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this OS, in satang").default(0),
  }),

  triggers: analyticsTriggersResponse,
  trigger: analyticsTriggersResponse, // backwards compatibility

  referers: z.object({
    referer: z
      .string()
      .describe("The name of the referer. If unknown, this will be `(direct)`"),
    clicks: z
      .number()
      .describe("The number of clicks from this referer")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this referer")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this referer")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this referer, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this referer").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this referer, in satang").default(0),
  }),

  referer_urls: z.object({
    refererUrl: z
      .string()
      .describe(
        "The full URL of the referer. If unknown, this will be `(direct)`",
      ),
    clicks: z
      .number()
      .describe("The number of clicks from this referer to this URL")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this referer to this URL")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this referer to this URL")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this referer to this URL, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this referer URL").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this referer URL, in satang").default(0),
  }),

  top_links: z.object({
    link: z
      .string()
      .describe("The unique ID of the short link")
      .meta({ deprecated: true }),
    id: z.string().describe("The unique ID of the short link"),
    domain: z.string().describe("The domain of the short link"),
    key: z.string().describe("The key of the short link"),
    shortLink: z.string().describe("The short link URL"),
    url: z.string().describe("The destination URL of the short link"),
    title: z
      .string()
      .nullish()
      .describe("The custom link preview title (og:title)"),
    comments: z.string().nullish().describe("The comments of the short link"),
    folderId: z
      .string()
      .nullish()
      .describe(
        "The ID of the folder that the link belongs to (if applicable)",
      ),
    partnerId: z
      .string()
      .nullish()
      .describe(
        "The ID of the partner that the link belongs to (if applicable)",
      ),
    createdAt: z.string().describe("The creation timestamp of the short link"),
    clicks: z
      .number()
      .describe("The number of clicks from this link")
      .default(0),
    leads: z.number().describe("The number of leads from this link").default(0),
    sales: z.number().describe("The number of sales from this link").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this link, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this link").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this link, in satang").default(0),
  }),

  top_urls: z.object({
    url: z
      .string()
      .describe("The full destination URL (including query parameters)"),
    clicks: z
      .number()
      .describe("The number of clicks from this URL")
      .default(0),
    leads: z.number().describe("The number of leads from this URL").default(0),
    sales: z.number().describe("The number of sales from this URL").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this URL, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this URL").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this URL, in satang").default(0),
  }),

  top_base_urls: z.object({
    url: z
      .string()
      .describe("The base URL (destination URL without query parameters)"),
    clicks: z
      .number()
      .describe("The number of clicks from this base URL")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads from this base URL")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales from this base URL")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this base URL, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this base URL").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this base URL, in satang").default(0),
  }),

  utm_sources: z.object({
    utm_source: z.string().describe("The UTM source"),
    clicks: z
      .number()
      .describe("The number of clicks with this UTM source")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads with this UTM source")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales with this UTM source")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales with this UTM source, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events with this UTM source").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount with this UTM source, in satang").default(0),
  }),

  utm_mediums: z.object({
    utm_medium: z.string().describe("The UTM medium"),
    clicks: z
      .number()
      .describe("The number of clicks with this UTM medium")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads with this UTM medium")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales with this UTM medium")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales with this UTM medium, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events with this UTM medium").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount with this UTM medium, in satang").default(0),
  }),

  utm_campaigns: z.object({
    utm_campaign: z.string().describe("The UTM campaign"),
    clicks: z
      .number()
      .describe("The number of clicks with this UTM campaign")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads with this UTM campaign")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales with this UTM campaign")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales with this UTM campaign, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events with this UTM campaign").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount with this UTM campaign, in satang").default(0),
  }),

  utm_terms: z.object({
    utm_term: z.string().describe("The UTM term"),
    clicks: z
      .number()
      .describe("The number of clicks with this UTM term")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads with this UTM term")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales with this UTM term")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales with this UTM term, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events with this UTM term").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount with this UTM term, in satang").default(0),
  }),

  utm_contents: z.object({
    utm_content: z.string().describe("The UTM content"),
    clicks: z
      .number()
      .describe("The number of clicks with this UTM content")
      .default(0),
    leads: z
      .number()
      .describe("The number of leads with this UTM content")
      .default(0),
    sales: z
      .number()
      .describe("The number of sales with this UTM content")
      .default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales with this UTM content, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events with this UTM content").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount with this UTM content, in satang").default(0),
  }),

  top_folders: z.object({
    folderId: z.string().describe("The ID of the folder"),
    folder: z.object({
      id: z.string().describe("The ID of the folder"),
      name: z.string().describe("The name of the folder"),
    }),
    clicks: z.number().describe("The total number of clicks").default(0),
    leads: z.number().describe("The total number of leads").default(0),
    sales: z.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this link folder, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this folder").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this folder, in satang").default(0),
  }),

  top_link_tags: z.object({
    tagId: z.string().describe("The ID of the tag"),
    tag: LinkTagSchema,
    clicks: z.number().describe("The total number of clicks").default(0),
    leads: z.number().describe("The total number of leads").default(0),
    sales: z.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this link tag, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this tag").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this tag, in satang").default(0),
  }),

  top_domains: z.object({
    domain: z.string().describe("The unique domain name"),
    clicks: z.number().describe("The total number of clicks").default(0),
    leads: z.number().describe("The total number of leads").default(0),
    sales: z.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this domain, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this domain").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this domain, in satang").default(0),
  }),

  top_partners: z.object({
    partnerId: z.string().describe("The ID of the partner"),
    partner: z.object({
      id: z.string().describe("The ID of the partner"),
      name: z.string().describe("The name of the partner"),
      image: z.string().nullable().describe("The image of the partner"),
      payoutsEnabledAt: z
        .string()
        .nullable()
        .describe("The date the partner enabled payouts"),
      country: z.string().nullable().describe("The country of the partner"),
    }),
    clicks: z.number().describe("The total number of clicks").default(0),
    leads: z.number().describe("The total number of leads").default(0),
    sales: z.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this partner for this program, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this partner").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this partner, in satang").default(0),
  }),

  top_groups: z.object({
    groupId: z.string().describe("The ID of the group"),
    group: z.object({
      id: z.string().describe("The ID of the group"),
      name: z.string().describe("The name of the group"),
      slug: z.string().describe("The slug of the group"),
      color: z.string().nullable().describe("The color of the group"),
    }),
    clicks: z.number().describe("The total number of clicks").default(0),
    leads: z.number().describe("The total number of leads").default(0),
    sales: z.number().describe("The total number of sales").default(0),
    saleAmount: centsSchemaWithDefault.describe(
      "The total amount of sales from this group, in cents",
    ),
    ngr: z.coerce.number().describe("The number of NGR events from this group").default(0),
    ngrAmount: z.coerce.number().describe("The total NGR amount from this group, in satang").default(0),
  }),
} as const;
