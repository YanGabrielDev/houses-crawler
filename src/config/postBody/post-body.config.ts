import type { PostBody } from "./post-body.types.ts";

export const postBody = ({
  businessContext,
  maxPrice,
  minPrice,
  pageSize = 500,
  coordinateLat,
  coordinateLng
}: PostBody) => {
  return {
    context: {
      mapShowing: true,
      listShowing: true,
      userId: "Air3W0rFILNzStFfBOri-wxBQVQk6wJ5NyZNS9vrt3vmPvKcMCYOLQ",
      deviceId: "Air3W0rFILNzStFfBOri-wxBQVQk6wJ5NyZNS9vrt3vmPvKcMCYOLQ",
      numPhotos: 12,
      isSSR: false,
    },
    filters: {
      businessContext: businessContext,
      blocklist: [],
      selectedHouses: [],
      location: {
        coordinate: {
          lat: coordinateLat,
          lng: coordinateLng,
        },
        viewport: {
          east: -43.840422565429684,
          north: -19.788643749804223,
          south: -19.999454492241185,
          west: -44.073882038085934,
        },
        neighborhoods: [],
        countryCode: "BR",
      },
      priceRange: [
        {
          costType: "SALE_PRICE",
          range: {
            min: minPrice,
            max: maxPrice,
          },
        },
      ],
      specialConditions: [],
      excludedSpecialConditions: [],
      houseSpecs: {
        area: {
          range: {},
        },
        houseTypes: [],
        amenities: [],
        installations: [],
        bathrooms: {
          range: {},
        },
        bedrooms: {
          range: {
            min: 2,
          },
        },
        parkingSpace: {
          range: {},
        },
        suites: {
          range: {},
        },
      },
      availability: "ANY",
      occupancy: "ANY",
      partnerIds: [],
      categories: [],
    },
    sorting: {
      criteria: "RELEVANCE",
      order: "DESC",
    },
    pagination: {
      pageSize: pageSize,
      offset: 0,
    },
    slug: "belo-horizonte-mg-brasil",
    fields: [
      "id",
      "coverImage",
      "rent",
      "totalCost",
      "salePrice",
      "iptuPlusCondominium",
      "area",
      "imageList",
      "imageCaptionList",
      "address",
      "regionName",
      "city",
      "visitStatus",
      "activeSpecialConditions",
      "type",
      "forRent",
      "forSale",
      "isPrimaryMarket",
      "bedrooms",
      "parkingSpaces",
      "suites",
      "listingTags",
      "yield",
      "yieldStrategy",
      "neighbourhood",
      "categories",
      "bathrooms",
      "isFurnished",
      "installations",
      "amenities",
      "shortDescription",
    ],
    locationDescriptions: [
      {
        description: "belo-horizonte-mg-brasil",
      },
    ],
  };
};
