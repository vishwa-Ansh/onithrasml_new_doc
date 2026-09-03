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
                description: "Unique identifier for each property.",
            },
            {
                name: "MSSubClass",
                type: "integer",
                description: "Building class identifier.",
            },
            {
                name: "MSZoning",
                type: "categorical",
                description: "General zoning classification of the property.",
            },
            {
                name: "LotArea",
                type: "integer",
                description: "Lot size in square feet.",
            },
            {
                name: "LotConfig",
                type: "categorical",
                description: "Configuration of the property lot.",
            },
            {
                name: "BldgType",
                type: "categorical",
                description: "Type of dwelling.",
            },
            {
                name: "OverallCond",
                type: "integer",
                description: "Overall condition rating of the property.",
            },
            {
                name: "YearBuilt",
                type: "integer",
                description: "Original construction year.",
            },
            {
                name: "YearRemodAdd",
                type: "integer",
                description: "Year of the most recent remodeling.",
            },
            {
                name: "Exterior1st",
                type: "categorical",
                description: "Primary exterior covering of the property.",
            },
            {
                name: "BsmtFinSF2",
                type: "numeric",
                description: "Finished basement area of type 2.",
            },
            {
                name: "TotalBsmtSF",
                type: "numeric",
                description: "Total basement area in square feet.",
            },
            {
                name: "SalePrice",
                type: "numeric",
                description: "Sale price of the property and regression target.",
            },
        ],
    },

    {
        name: "Global Air Pollution",
        slug: "global-air-pollution",
        type: "Environmental Analysis",

        description:
            "A global air pollution dataset containing air quality measurements and pollution categories for cities around the world. It can be used for exploratory data analysis, AQI analysis, pollution comparison, visualization, and machine learning experiments.",

        samples: 23465,

        features: 11,

        target: "AQI Value",

        file: "/datasets/global-air-pollution.csv",

        columns: [
            {
                name: "Country",
                type: "categorical",
                description: "Country where the air quality measurement was recorded.",
            },
            {
                name: "City",
                type: "categorical",
                description: "City where the air quality measurement was recorded.",
            },
            {
                name: "AQI Value",
                type: "numeric",
                description: "Overall Air Quality Index value.",
            },
            {
                name: "AQI Category",
                type: "categorical",
                description:
                    "Air quality category associated with the overall AQI value.",
            },
            {
                name: "CO AQI Value",
                type: "numeric",
                description:
                    "Air Quality Index value associated with carbon monoxide (CO).",
            },
            {
                name: "CO AQI Category",
                type: "categorical",
                description: "Air quality category associated with the CO AQI value.",
            },
            {
                name: "Ozone AQI Value",
                type: "numeric",
                description: "Air Quality Index value associated with ozone (O3).",
            },
            {
                name: "Ozone AQI Category",
                type: "categorical",
                description:
                    "Air quality category associated with the ozone AQI value.",
            },
            {
                name: "NO2 AQI Value",
                type: "numeric",
                description:
                    "Air Quality Index value associated with nitrogen dioxide (NO2).",
            },
            {
                name: "NO2 AQI Category",
                type: "categorical",
                description: "Air quality category associated with the NO2 AQI value.",
            },
            {
                name: "PM2.5 AQI Value",
                type: "numeric",
                description:
                    "Air Quality Index value associated with fine particulate matter (PM2.5).",
            },
            {
                name: "PM2.5 AQI Category",
                type: "categorical",
                description:
                    "Air quality category associated with the PM2.5 AQI value.",
            },
        ],
    },
  
    {
        name: "Weather History",
        slug: "weather-history",
        type: "Time Series",

        description:
            "A historical weather dataset containing hourly atmospheric observations, weather conditions, precipitation information, temperature, humidity, wind, visibility, and atmospheric pressure. It can be used for time-series analysis, regression, forecasting experiments, visualization, and exploratory data analysis.",

        samples: 96455,

        features: 12,

        target: "Temperature (C)",

        file: "/datasets/weatherHistory.csv",

        columns: [
            {
                name: "Formatted Date",
                type: "datetime",
                description:
                    "Date and time at which the weather observation was recorded.",
            },
            {
                name: "Summary",
                type: "categorical",
                description:
                    "Short description of the observed weather condition.",
            },
            {
                name: "Precip Type",
                type: "categorical",
                description:
                    "Type of precipitation recorded, such as rain or snow.",
            },
            {
                name: "Temperature (C)",
                type: "numeric",
                description:
                    "Observed air temperature in degrees Celsius.",
            },
            {
                name: "Apparent Temperature (C)",
                type: "numeric",
                description:
                    "Perceived temperature in degrees Celsius.",
            },
            {
                name: "Humidity",
                type: "numeric",
                description:
                    "Relative humidity represented as a proportion.",
            },
            {
                name: "Wind Speed (km/h)",
                type: "numeric",
                description:
                    "Wind speed measured in kilometers per hour.",
            },
            {
                name: "Wind Bearing (degrees)",
                type: "numeric",
                description:
                    "Direction of the wind measured in degrees.",
            },
            {
                name: "Visibility (km)",
                type: "numeric",
                description:
                    "Visibility distance measured in kilometers.",
            },
            {
                name: "Loud Cover",
                type: "numeric",
                description:
                    "Cloud-cover related numerical measurement.",
            },
            {
                name: "Pressure (millibars)",
                type: "numeric",
                description:
                    "Atmospheric pressure measured in millibars.",
            },
            {
                name: "Daily Summary",
                type: "categorical",
                description:
                    "Summary describing the weather conditions throughout the day.",
            },
        ],
    },

      {
        name: "Heart Disease",
        slug: "heart",
        type: "Classification",

        description:
            "A cardiovascular dataset containing patient health measurements and clinical indicators. It can be used for classification experiments, exploratory data analysis, preprocessing, feature engineering, and model evaluation.",

        samples: 305,

        features: 13,

        target: "target",

        file: "/datasets/heart.csv",

        columns: [
            {
                name: "age",
                type: "integer",
                description:
                    "Age of the patient in years.",
            },
            {
                name: "sex",
                type: "categorical",
                description:
                    "Sex of the patient represented as a categorical value.",
            },
            {
                name: "cp",
                type: "categorical",
                description:
                    "Chest pain type.",
            },
            {
                name: "trestbps",
                type: "numeric",
                description:
                    "Resting blood pressure measured in mm Hg.",
            },
            {
                name: "chol",
                type: "numeric",
                description:
                    "Serum cholesterol level.",
            },
            {
                name: "fbs",
                type: "categorical",
                description:
                    "Fasting blood sugar indicator.",
            },
            {
                name: "restecg",
                type: "categorical",
                description:
                    "Resting electrocardiographic results.",
            },
            {
                name: "thalach",
                type: "numeric",
                description:
                    "Maximum heart rate achieved.",
            },
            {
                name: "exang",
                type: "categorical",
                description:
                    "Exercise-induced angina indicator.",
            },
            {
                name: "oldpeak",
                type: "numeric",
                description:
                    "ST depression induced by exercise relative to rest.",
            },
            {
                name: "slope",
                type: "categorical",
                description:
                    "Slope of the peak exercise ST segment.",
            },
            {
                name: "ca",
                type: "categorical",
                description:
                    "Number of major vessels colored by fluoroscopy.",
            },
            {
                name: "thal",
                type: "categorical",
                description:
                    "Thalassemia-related categorical measurement.",
            },
            {
                name: "target",
                type: "binary",
                description:
                    "Target variable indicating the presence or absence of heart disease.",
            },
        ],
    },
    {
    name: "Students Performance",
    slug: "students-performance",
    type: "Regression",

    description:
        "A student performance dataset containing demographic information, parental education, lunch type, test preparation status, and mathematics, reading, and writing scores. It can be used for exploratory data analysis, regression, preprocessing, feature engineering, and educational data analysis.",

    samples: 1002,

    features: 7,

    target: "math score",

    file: "/datasets/StudentsPerformance.csv",

    columns: [
        {
            name: "gender",
            type: "categorical",
            description:
                "Gender of the student.",
        },
        {
            name: "race/ethnicity",
            type: "categorical",
            description:
                "Race or ethnicity group assigned to the student.",
        },
        {
            name: "parental level of education",
            type: "categorical",
            description:
                "Highest education level attained by the student's parent or parents.",
        },
        {
            name: "lunch",
            type: "categorical",
            description:
                "Type of lunch received by the student.",
        },
        {
            name: "test preparation course",
            type: "categorical",
            description:
                "Whether the student completed a test preparation course.",
        },
        {
            name: "math score",
            type: "numeric",
            description:
                "Student's mathematics test score.",
        },
        {
            name: "reading score",
            type: "numeric",
            description:
                "Student's reading test score.",
        },
        {
            name: "writing score",
            type: "numeric",
            description:
                "Student's writing test score.",
        },
    ],
},

{
    name: "Insurance",
    slug: "insurance",
    type: "Regression",

    description:
        "A health insurance dataset containing demographic information, body mass index, number of children, smoking status, geographic region, and individual medical insurance charges. It can be used for regression, exploratory data analysis, preprocessing, feature engineering, and machine learning experiments.",

    samples: 1340,

    features: 6,

    target: "charges",

    file: "/datasets/insurance.csv",

    columns: [
        {
            name: "age",
            type: "integer",
            description:
                "Age of the insured person in years.",
        },
        {
            name: "sex",
            type: "categorical",
            description:
                "Sex of the insured person.",
        },
        {
            name: "bmi",
            type: "numeric",
            description:
                "Body Mass Index of the insured person.",
        },
        {
            name: "children",
            type: "integer",
            description:
                "Number of children or dependents covered by the insurance plan.",
        },
        {
            name: "smoker",
            type: "categorical",
            description:
                "Indicates whether the insured person is a smoker.",
        },
        {
            name: "region",
            type: "categorical",
            description:
                "Geographic region of the insured person.",
        },
        {
            name: "charges",
            type: "numeric",
            description:
                "Individual medical insurance charges and the regression target.",
        },
    ],
},
];
