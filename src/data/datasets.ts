export interface DatasetColumn {
    name: string;
    type: string;
    description: string;
}

export interface DatasetInfo {
    name: string;
    slug: string;
    type: string;
    description: string;
    samples: number;
    features: number;
    target: string;
    file: string;
    columns: DatasetColumn[];
}

export const datasets: DatasetInfo[] = [
    {
        name: "House Prices",
        slug: "house-prices",
        type: "Regression",

        description:
            "A housing dataset containing property characteristics and sale prices. It can be used for regression, exploratory data analysis, feature engineering, and machine learning experiments.",

        samples: 2000,
        features: 12,
        target: "SalePrice",

        file: "/datasets/house-prices.csv",

        columns: [
            {
                name: "Id",
                type: "integer",
                description:
                    "Unique identifier for each property.",
            },
            {
                name: "MSSubClass",
                type: "integer",
                description:
                    "Building class identifier.",
            },
            {
                name: "MSZoning",
                type: "categorical",
                description:
                    "General zoning classification of the property.",
            },
            {
                name: "LotArea",
                type: "integer",
                description:
                    "Lot size in square feet.",
            },
            {
                name: "LotConfig",
                type: "categorical",
                description:
                    "Configuration of the property lot.",
            },
            {
                name: "BldgType",
                type: "categorical",
                description:
                    "Type of dwelling.",
            },
            {
                name: "OverallCond",
                type: "integer",
                description:
                    "Overall condition rating of the property.",
            },
            {
                name: "YearBuilt",
                type: "integer",
                description:
                    "Original construction year.",
            },
            {
                name: "YearRemodAdd",
                type: "integer",
                description:
                    "Year of the most recent remodeling.",
            },
            {
                name: "Exterior1st",
                type: "categorical",
                description:
                    "Primary exterior covering of the property.",
            },
            {
                name: "BsmtFinSF2",
                type: "numeric",
                description:
                    "Finished basement area of type 2.",
            },
            {
                name: "TotalBsmtSF",
                type: "numeric",
                description:
                    "Total basement area in square feet.",
            },
            {
                name: "SalePrice",
                type: "numeric",
                description:
                    "Sale price of the property and regression target.",
            },
        ],
    },
];