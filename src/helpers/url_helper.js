//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/api/oauth/user-get-token";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/user";

// Calendar
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

// Chat
export const GET_DIRECT_CONTACT = "/chat";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "add/message";
export const GET_CHANNELS = "/channels";
export const DELETE_MESSAGE = "delete/message";

//Mailbox
export const GET_MAIL_DETAILS = "/mail";
export const DELETE_MAIL = "/delete/mail";

// Ecommerce
// Product
export const GET_PRODUCTS = "/apps/product";
export const DELETE_PRODUCT = "/apps/product";
export const ADD_NEW_PRODUCT = "/apps/product";
export const UPDATE_PRODUCT = "/apps/product";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

// Sellers
export const GET_SELLERS = "/sellers";

// Project list
export const GET_PROJECT_LIST = "/project/list";

// Task
export const GET_TASK_LIST = "/apps/task";
export const ADD_NEW_TASK = "/apps/task";
export const UPDATE_TASK = "/apps/task";
export const DELETE_TASK = "/apps/task";

// CRM
// Conatct
export const GET_CONTACTS = "/apps/contact";
export const ADD_NEW_CONTACT = "/apps/contact";
export const UPDATE_CONTACT = "/apps/contact";
export const DELETE_CONTACT = "/apps/contact";

// Companies
export const GET_COMPANIES = "/apps/company";
export const ADD_NEW_COMPANIES = "/apps/company";
export const UPDATE_COMPANIES = "/apps/company";
export const DELETE_COMPANIES = "/apps/company";

// Lead
export const GET_LEADS = "/apps/lead";
export const ADD_NEW_LEAD = "/apps/lead";
export const UPDATE_LEAD = "/apps/lead";
export const DELETE_LEAD = "/apps/lead";

// Deals
export const GET_DEALS = "/deals";

// Crypto
export const GET_TRANSACTION_LIST = "/transaction-list";
export const GET_ORDRER_LIST = "/order-list";

// Invoice
export const GET_INVOICES = "/apps/invoice";
export const ADD_NEW_INVOICE = "/apps/invoice";
export const UPDATE_INVOICE = "/apps/invoice";
export const DELETE_INVOICE = "/apps/invoice";

// TicketsList
export const GET_TICKETS_LIST = "/apps/ticket";
export const ADD_NEW_TICKET = "/apps/ticket";
export const UPDATE_TICKET = "/apps/ticket";
export const DELETE_TICKET = "/apps/ticket";

// Dashboard Analytics

// Sessions by Countries
export const GET_ALL_DATA = "/all-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_MONTHLY_DATA = "/monthly-data";

// Audiences Metrics
export const GET_ALLAUDIENCESMETRICS_DATA = "/allAudiencesMetrics-data";
export const GET_MONTHLYAUDIENCESMETRICS_DATA = "/monthlyAudiencesMetrics-data";
export const GET_HALFYEARLYAUDIENCESMETRICS_DATA =
  "/halfyearlyAudiencesMetrics-data";
export const GET_YEARLYAUDIENCESMETRICS_DATA = "/yearlyAudiencesMetrics-data";

// Users by Device
export const GET_TODAYDEVICE_DATA = "/todayDevice-data";
export const GET_LASTWEEKDEVICE_DATA = "/lastWeekDevice-data";
export const GET_LASTMONTHDEVICE_DATA = "/lastMonthDevice-data";
export const GET_CURRENTYEARDEVICE_DATA = "/currentYearDevice-data";

// Audiences Sessions by Country
export const GET_TODAYSESSION_DATA = "/todaySession-data";
export const GET_LASTWEEKSESSION_DATA = "/lastWeekSession-data";
export const GET_LASTMONTHSESSION_DATA = "/lastMonthSession-data";
export const GET_CURRENTYEARSESSION_DATA = "/currentYearSession-data";

// Dashboard CRM

// Balance Overview
export const GET_TODAYBALANCE_DATA = "/todayBalance-data";
export const GET_LASTWEEKBALANCE_DATA = "/lastWeekBalance-data";
export const GET_LASTMONTHBALANCE_DATA = "/lastMonthBalance-data";
export const GET_CURRENTYEARBALANCE_DATA = "/currentYearBalance-data";

// Deal type
export const GET_TODAYDEAL_DATA = "/todayDeal-data";
export const GET_WEEKLYDEAL_DATA = "/weeklyDeal-data";
export const GET_MONTHLYDEAL_DATA = "/monthlyDeal-data";
export const GET_YEARLYDEAL_DATA = "/yearlyDeal-data";

// Sales Forecast

export const GET_OCTSALES_DATA = "/octSales-data";
export const GET_NOVSALES_DATA = "/novSales-data";
export const GET_DECSALES_DATA = "/decSales-data";
export const GET_JANSALES_DATA = "/janSales-data";

// Dashboard Ecommerce
// Revenue
export const GET_ALLREVENUE_DATA = "/allRevenue-data";
export const GET_MONTHREVENUE_DATA = "/monthRevenue-data";
export const GET_HALFYEARREVENUE_DATA = "/halfYearRevenue-data";
export const GET_YEARREVENUE_DATA = "/yearRevenue-data";

// Dashboard Crypto
// Portfolio
export const GET_BTCPORTFOLIO_DATA = "/btcPortfolio-data";
export const GET_USDPORTFOLIO_DATA = "/usdPortfolio-data";
export const GET_EUROPORTFOLIO_DATA = "/euroPortfolio-data";

// Market Graph
export const GET_ALLMARKETDATA_DATA = "/allMarket-data";
export const GET_YEARMARKET_DATA = "/yearMarket-data";
export const GET_MONTHMARKET_DATA = "/monthMarket-data";
export const GET_WEEKMARKET_DATA = "/weekMarket-data";
export const GET_HOURMARKET_DATA = "/hourMarket-data";

// Dashboard Crypto
// Project Overview
export const GET_ALLPROJECT_DATA = "/allProject-data";
export const GET_MONTHPROJECT_DATA = "/monthProject-data";
export const GET_HALFYEARPROJECT_DATA = "/halfYearProject-data";
export const GET_YEARPROJECT_DATA = "/yearProject-data";

// Project Status
export const GET_ALLPROJECTSTATUS_DATA = "/allProjectStatus-data";
export const GET_WEEKPROJECTSTATUS_DATA = "/weekProjectStatus-data";
export const GET_MONTHPROJECTSTATUS_DATA = "/monthProjectStatus-data";
export const GET_QUARTERPROJECTSTATUS_DATA = "/quarterProjectStatus-data";

// Dashboard NFT
// Marketplace
export const GET_ALLMARKETPLACE_DATA = "/allMarketplace-data";
export const GET_MONTHMARKETPLACE_DATA = "/monthMarketplace-data";
export const GET_HALFYEARMARKETPLACE_DATA = "/halfYearMarketplace-data";
export const GET_YEARMARKETPLACE_DATA = "/yearMarketplace-data";

// Project
export const ADD_NEW_PROJECT = "/add/project";
export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";

// Pages > Team
export const GET_TEAMDATA = "/teamData";
export const DELETE_TEAMDATA = "/delete/teamData";
export const ADD_NEW_TEAMDATA = "/add/teamData";
export const UPDATE_TEAMDATA = "/update/teamData";

// File Manager
// Folder
export const GET_FOLDERS = "/folder";
export const DELETE_FOLDER = "/delete/folder";
export const ADD_NEW_FOLDER = "/add/folder";
export const UPDATE_FOLDER = "/update/folder";

// File
export const GET_FILES = "/file";
export const DELETE_FILE = "/delete/file";
export const ADD_NEW_FILE = "/add/file";
export const UPDATE_FILE = "/update/file";

// To do
export const GET_TODOS = "/todo";
export const DELETE_TODO = "/delete/todo";
export const ADD_NEW_TODO = "/add/todo";
export const UPDATE_TODO = "/update/todo";

// To do Project
export const GET_PROJECTS = "/projects";
export const ADD_NEW_TODO_PROJECT = "/add/project";

//JOB APPLICATION
export const GET_APPLICATION_LIST = "/application-list";

//JOB APPLICATION
export const GET_API_KEY = "/api-key";

//TSHT
var urlAPI = process.env.REACT_APP_API_URL;
export const GET_LIST_TAG = `/cms/tag-get-list`;
export const GET_TAG_BY_ID = `/cms/tag-get-by-id`;
export const POST_TAG = `/cms/tag-insert`;
export const PUT_TAG = `/cms/tag-update`;
export const DEL_TAG = `/cms/tag-delete`;

export const GET_LIST_DEPARTMENT = `/cms/department-get-list`;
export const GET_DEPARTMENT_BY_ID = `/cms/department-get-by-id`;
export const POST_DEPARTMENT = `/cms/department-insert`;
export const PUT_DEPARTMENT = `/cms/department-update`;
export const DEL_DEPARTMENT = `/cms/department-delete`;

export const GET_LIST_CATEGORY = `/cms/category-get-list`;
export const GET_CATEGORY_BY_ID = `/cms/category-get-by-id`;
export const POST_CATEGORY = `/cms/category-insert`;
export const PUT_CATEGORY = `/cms/category-update`;
export const DEL_CATEGORY = `/cms/category-delete`;

export const GET_LIST_ACCOUNT = `/cms/user-get-list-full-info`;
export const SEARCH_GET_LIST_ACCOUNT = `/cms/user-get-by-info`;
export const GET_ACCOUNT_BY_ID = `/cms/user-get-id`;
export const POST_ACCOUNT = `/cms/user-insert`;
export const PUT_ACCOUNT = `/cms/user-update`;
export const DEL_ACCOUNT = `/cms/user-delete`;

//COMMENT
export const GET_LIST_COMMENT = `/cms/tag-get-list`;
export const GET_COMMENT_BY_ID = `/cms/article-comment-get-by-article-id`;
export const POST_COMMENT = `/cms/article-comment-insert`;
export const PUT_COMMENT = `/cms/article-comment-update`;
export const DEL_COMMENT = `/cms/article-comment-delete`;

//PROCESS
export const GET_LIST_PROCESS = `/cms/role-get-list`;
export const GET_PROCESS_BY_ID = `/cms/role-get-by-article-type-id`;
export const POST_PROCESS = `/cms/role-insert`;
export const PUT_PROCESS = `/cms/role-update`;
export const DEL_PROCESS = `/cms/role-delete`;

//CHANNEL
export const GET_LIST_CHANNEL = `/cms/live-channel-get-list`;
export const GET_CHANNEL_BY_ID = `/cms/live-channel-get-by-id`;
export const POST_CHANNEL = `/cms/live-channel-insert`;
export const PUT_CHANNEL = `/cms/live-channel-update`;
export const DEL_CHANNEL = `/cms/live-channel-delete`;
export const GET_LIST_LIVE_CHANNEL_SOURCE_TYPE = `/cms/live-channel-get-list-source-type`;
export const GET_UPDATE_STATUS = `/cms/live-channel-update-status`;
export const GET_UPDATE_DRM_STATUS = `/cms/live-channel-update-drm-status`;

//EPG
export const GET_EPG_LIST_BY_DATE_AND_CHANNEL = `/cms/epg-get-list-by-date-and-channel-id`;
export const GET_EPG_GET_BY_ID = `/cms/epg-get-by-id`;
export const GET_EPG_GET_LIST_BY_CHANNEL_ID = `/cms/epg-get-list-by-channel-id`;
export const DEL_EPG = `/cms/epg-delete`;

//ARTICLE
export const GET_LIST_ARTICLE_BY_FILTER = `/cms/article-get-list-filter`;
export const GET_LIST_ARTICLE_TYPE = `/cms/article-type-get-list`;
export const GET_LIST_AUTHOR = `/cms/author-get-list-by-article`;

export const ARTICLE_GET_LIST_BY_OUTSTANDING =
  "/cms/article-get-list-by-outstanding";

export const ARTICLE_GET_LIST_BY_OUTSTANDING_SELECTED =
  "/cms/article-get-list-by-outstanding-selected";

export const ARTICLE_UPDATE_ORDER_POSITON =
  "/cms/article-update-order-position";
export const POST_ARTICLE = `/cms/article-insert`;
export const DEL_ARTICLE = `/cms/article-delete`;
