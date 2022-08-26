import Kidz from "../../images/sidebaricons/kidz.svg";
import Participate from "../../images/sidebaricons/participate.svg";
import Gallery from "../../images/sidebaricons/gallery.svg";
import Downloads from "../../images/sidebaricons/download.svg";
import OldContests from "../../images/sidebaricons/oldContest.svg";
import Help from "../../images/sidebaricons/help.svg";
import StarBucks from "../../images/sidebaricons/starBucks.svg";
import Contest from "../../images/sidebaricons/contests.svg";
import Judging from "../../images/sidebaricons/judging.svg";
import Verification from "../../images/sidebaricons/verification.svg";
import Reports from "../../images/sidebaricons/reports.svg";
import Masters from "../../images/sidebaricons/masters.svg";
import Settings from "../../images/sidebaricons/settings.svg";

let menu = [
  {
    icon: Kidz,
    text: "Kidz Lounge",
    link: "dashboard",
  },
  {
    icon: Participate,
    text: "Participate",
    link: "participate",
  },
  {
    icon: Gallery,
    text: "My Gallery",
    link: "gallery",
  },
  {
    icon: Downloads,
    text: "Downloads",
    link: "downloads",
  },
  {
    icon: OldContests,
    text: "My Old Contests",
    link: "old-contests",
  },
  {
    icon: Help,
    text: "Helpdesk",
    link: "help",
  },
  /*{
    icon: StarBucks,
    text: "Star-Bucks",
    link: "starbucks",
  },*/

  {
    icon: StarBucks,
    text: "Purchase Star-Bucks",
    link: "buy_starbucks",
  },

  // {
  //   icon: Contest,
  //   text: "Contest",
  //   active: false,
  //   subMenu: [
  //     // {
  //     //   text: "Contests",
  //     //   link: "/contests",
  //     // },
  //     // {
  //     //   text: "Judging",
  //     //   link: "/judging",
  //     // },
  //   ],
  // },
  // {
  //   icon: Judging,
  //   text: "Judging",
  //   link: "/judging",
  //   // active: false,
  //   // subMenu: [],
  // },
  // {
  //   icon: Verification,
  //   text: "Verification",
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Reports,
  //   text: "Reports",
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Masters,
  //   text: "Masters",
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Settings,
  //   text: "Settings",
  //   active: false,
  //   subMenu: [],
  // },
];

const user = JSON.parse(localStorage.getItem("user"))?.data;
if (user?.role === "contest_managern") {
  menu = [
    {
      icon: Kidz,
      text: "Dashboard",
      link: "content_dashboard",
    },
    {
      icon: StarBucks,
      text: "Create Contest",
      link: "create-contest",
    },
    {
      icon: StarBucks,
      text: "Monitor Contest",
      link: "monitor-contest",
    },
    {
      icon: StarBucks,
      text: "Close Contest",
      link: "close-contest",
    },
    /*    {
      icon: StarBucks,
      text: "Leave management",
      link: "leave-management",
    },
	*/
    {
      icon: StarBucks,
      text: "Result Preparation and announcement",
      link: "result-preparation-and-announcement",
    },
    /*   {
      icon: StarBucks,
      text: "Generation of Certificates",
      link: "generation-of-certificates",
    },
	*/
  ];
}

if (user?.role === "quality_analyst") {
  menu = [
    {
      icon: Kidz,
      text: "Dashboard",
      link: "content_dashboard",
    },
    {
      icon: StarBucks,
      text: "Verify Contestants",
      link: "verify-contestant",
    },
    {
      icon: StarBucks,
      text: "Manage Contestant Entries",
      link: "manage-contestant",
    },
    {
      icon: StarBucks,
      text: "Verify Age Proof",
      link: "verify-age",
    },
    {
      icon: StarBucks,
      text: "Request To Assign Task",
      link: "ask_for_more_work",
    },
  ];
}

if (user?.role === "judge") {
  menu = [
    {
      icon: StarBucks,
      text: "Dashboard",
      link: "judge_dashboard",
    },

    {
      icon: StarBucks,
      text: "Judge Entries",
      link: "judge_gallery",
    },
  ];
}

if (user?.role === "client_admin") {
  menu = [
    {
      icon: StarBucks,
      text: "Dashboard",
      link: "client_dashboard",
    },

    {
      icon: StarBucks,
      text: "Role Management",
      link: "roles",
    },
    {
      icon: StarBucks,
      text: "User Creation",
      link: "users",
    },
    {
      icon: StarBucks,
      text: "Children Enrollment",
      link: "children_enrollments",
    },
    /* {
      icon: StarBucks,
      text: "Unique Id Generation",
      link: "old-contests",
    },
	*/
    {
      icon: StarBucks,
      text: "Class Master",
      link: "class_master",
    },
    {
      icon: StarBucks,
      text: "Section Master",
      link: "section_master",
    },
    {
      icon: StarBucks,
      text: "House Master",
      link: "house_master",
    },
    {
      icon: StarBucks,
      text: "Stream Master",
      link: "stream_master",
    },
    {
      icon: StarBucks,
      text: "Create Contest",
      link: "create-contest",
    },
  ];
}

if (user?.role === "administrator") {
  menu = [
    {
      icon: Kidz,
      text: "Dashboard",
      link: "dashboard",
    },

    {
      icon: Contest,
      text: "Contests",
      active: false,
      subMenu: [
        /*{
		  icon: StarBucks,
		  text: "Contest Type ",
		  link: "content_types",
		},
		{
		  icon: StarBucks,
		  text: "Contest Category",
		  link: "contest_categories",
		},
		
		{
		  icon: StarBucks,
		  text: "Mange contest",
		  link: "CONTEST",
		},
		 {
			icon: StarBucks,
			text: "Close Judging Level",
			link: "help",
		  }*/

        {
          icon: StarBucks,
          text: "Create Contest",
          link: "create-contest",
        },
        {
          icon: StarBucks,
          text: "Monitor Contest",
          link: "monitor-contest",
        },
        {
          icon: StarBucks,
          text: "Close Contest",
          link: "close-contest",
        },
        {
          icon: StarBucks,
          text: "Result Preparation and announcement",
          link: "result-preparation-and-announcement",
        },
      ],
    },
    {
      icon: Judging,
      text: "Judgings",
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: "Judge Entries",
          link: "judge_gallery",
        },
        /*	{
		  icon: StarBucks,
		  text: "judging parameter ",
		  link: "judging_parameters",
		},
		{
		  icon: StarBucks,
		  text: "prize master",
		  link: "prizes",
		},
		*/
      ],
    },
    {
      icon: Verification,
      text: "Verification",
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: "Manage Registrations",
          link: "content_dashboard",
        },
        {
          icon: StarBucks,
          text: "Manage Entries",
          link: "judge_dashboard",
        },
      ],
    },

    {
      icon: Reports,
      text: "Reports",
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: "Registrations Report",
          link: "registration_report",
        },
        {
          icon: StarBucks,
          text: "Contest Entry",
          link: "contest_entries",
        },
        {
          icon: StarBucks,
          text: "Login Report",
          link: "login_reports",
        },
      ],
    },

    {
      icon: Masters,
      text: "Masters",
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: "Role Management",
          link: "roles",
        },
        {
          icon: StarBucks,
          text: "User Creation",
          link: "users",
        },

        {
          icon: StarBucks,
          text: "Region Management",
          link: "regions",
        },
        {
          icon: StarBucks,
          text: "State Management",
          link: "states",
        },
        {
          icon: StarBucks,
          text: "City Management",
          link: "cities",
        },
        {
          icon: StarBucks,
          text: "Brackets Management",
          link: "brackets",
        },
        {
          icon: StarBucks,
          text: "Contest Type Management",
          link: "content_types",
        },
        {
          icon: StarBucks,
          text: "Contest Category Management",
          link: "contest_categories",
        },
        {
          icon: StarBucks,
          text: "star buck master",
          link: "starbucks",
        },
        {
          icon: StarBucks,
          text: "judging parameter ",
          link: "judging_parameters",
        },
        /*	
		{
		  icon: StarBucks,
		  text: "prize master",
		  link: "prizes",
		},
	*/
      ],
    },

    /*   
	
	{
      icon: StarBucks,
      text: "Rejection Reason Management",
      link: "rejection_reason",
    },
	*/

    {
      icon: Help,
      text: "Helpdesk",
      link: "help",
    },

    /*
	{
      icon: StarBucks,
      text: "Photo Editor",
      link: "City",
    },
	
	{
      icon: StarBucks,
      text: "Assigning Entries To Qa",
      link: "City",
    },
	{
      icon: StarBucks,
      text: "Assigning Entries To Qa On Request",
      link: "City",
    },
	{
      icon: StarBucks,
      text: "Reassigning Entries To Qa",
      link: "City",
    },
	{
      icon: StarBucks,
      text: "Event Knowledge Series Creation",
      link: "City",
    },
	{
      icon: StarBucks,
      text: "Schedule Stakeholders Leave",
      link: "City",
    },*/
  ];
}

// Create Contest
// Monitor Contest
// Close Contest
// Leave management
// Result Preparation and announcement
// Generation of Certificates

export default menu;

// const menu = [
//   {
//     heading: "Use-case preview",
//   },
//   {
//     icon: "bag",
//     text: "E-Commerce Panel",
//     link: "/ecommerce/index",
//     panel: true,
//     newTab: true,
//     subPanel: [
//       {
//         icon: "dashboard-fill",
//         text: "Dashboard",
//         link: "/ecommerce/index",
//       },
//       {
//         icon: "bag-fill",
//         text: "Orders",
//         link: "/ecommerce/orders",
//       },
//       {
//         icon: "package-fill",
//         text: "Products",
//         link: "/ecommerce/products",
//       },
//       {
//         icon: "users-fill",
//         text: "Customers",
//         link: "/ecommerce/customer",
//       },
//       {
//         icon: "chat-fill",
//         text: "Support",
//         link: "/ecommerce/support",
//       },
//       {
//         icon: "opt-alt-fill",
//         text: "Settings",
//         link: "/ecommerce/settings",
//       },
//       {
//         icon: "server-fill",
//         text: "Integration",
//         link: "/ecommerce/integration",
//       },
//     ],
//   },
//   {
//     heading: "Dashboards",
//   },
//   {
//     icon: "cart-fill",
//     text: "Default",
//     link: "/",
//   },
//   {
//     icon: "activity-round-fill",
//     text: "Sales",
//     link: "/sales",
//   },
//   {
//     icon: "growth-fill",
//     text: "Analytics",
//     link: "/analytics",
//   },
//   {
//     heading: "Pre-built Pages",
//   },
//   {
//     icon: "tile-thumb-fill",
//     text: "Projects",
//     active: false,
//     subMenu: [
//       {
//         text: "Project Cards",
//         link: "/project-card",
//       },
//       {
//         text: "Project List",
//         link: "/project-list",
//       },
//     ],
//   },
//   {
//     icon: "users-fill",
//     text: "User Manage",
//     active: false,
//     subMenu: [
//       {
//         text: "User List - Default",
//         link: "/user-list-default",
//       },
//       {
//         text: "User List - Regular",
//         link: "/user-list-regular",
//       },
//       {
//         text: "User List - Compact",
//         link: "/user-list-compact",
//       },
//       {
//         text: "User Details - Regular",
//         link: "/user-details-regular/1",
//       },
//       {
//         text: "User Profile - Regular",
//         link: "/user-profile-regular",
//       },
//       {
//         text: "User Contact - Card",
//         link: "/user-contact-card",
//       },
//     ],
//   },

//   {
//     icon: "cc-alt2-fill",
//     text: "Orders",
//     active: false,
//     subMenu: [
//       {
//         text: "Order List - Default",
//         link: "/order-list-default",
//       },
//       {
//         text: "Order List - Regular",
//         link: "/order-list-regular",
//       },
//       {
//         text: "Order List - Sales",
//         link: "/order-list-sales",
//       },
//     ],
//   },
//   {
//     icon: "file-docs",
//     text: "AML / KYCs",
//     active: false,
//     subMenu: [
//       {
//         text: "KYC List - Regular",
//         link: "/kyc-list-regular",
//       },
//       {
//         text: "KYC Details - Regular",
//         link: "/kyc-details-regular/UD01544",
//       },
//     ],
//   },
//   {
//     icon: "grid-alt-fill",
//     text: "Applications",
//     active: false,
//     subMenu: [
//       {
//         text: "Messages",
//         link: "/app-messages",
//       },
//       {
//         text: "Chats / Messenger",
//         link: "/app-chat",
//       },
//       {
//         text: "Inbox / Mail",
//         link: "/app-inbox",
//       },
//       {
//         text: "Calendar",
//         link: "/app-calender",
//       },
//       {
//         text: "Kanban Board",
//         link: "/app-kanban",
//       },
//       {
//         text: "File Manager",
//         link: "/app-file-manager",
//         badge: "new",
//       },
//     ],
//   },
//   {
//     icon: "card-view",
//     text: "Products",
//     active: false,
//     subMenu: [
//       {
//         text: "Product List",
//         link: "/product-list",
//       },
//       {
//         text: "Product Card",
//         link: "/product-card",
//       },
//       {
//         text: "Product Details",
//         link: "/product-details/0",
//       },
//     ],
//   },
//   {
//     icon: "file-docs",
//     text: "Invoice",
//     active: false,
//     subMenu: [
//       {
//         text: "Invoice List",
//         link: "/invoice-list",
//       },
//       {
//         text: "Invoice Details",
//         link: "/invoice-details/1",
//       },
//     ],
//   },
//   {
//     icon: "view-col",
//     text: "Pricing Table",
//     link: "/pricing-table",
//   },
//   {
//     icon: "img",
//     text: "Image Gallery",
//     link: "/image-gallery",
//   },
//   {
//     heading: "Misc Pages",
//   },
//   {
//     icon: "light-fill",
//     text: "Auth Pages",
//     active: false,
//     subMenu: [
//       {
//         text: "Login / Signin",
//         link: "/login",
//         newTab: true,
//       },
//       {
//         text: "Register / Signup",
//         link: "/register",
//         newTab: true,
//       },
//       {
//         text: "Forgot Password",
//         link: "/reset",
//         newTab: true,
//       },
//       {
//         text: "Success / Confirm",
//         link: "/auth-success",
//         newTab: true,
//       },
//     ],
//   },
//   {
//     icon: "files-fill",
//     text: "Error Pages",
//     active: false,
//     subMenu: [
//       {
//         text: "404 Classic",
//         link: "/errors/404-classic",
//         newTab: true,
//       },
//       {
//         text: "504 Classic",
//         link: "/errors/504-classic",
//         newTab: true,
//       },
//       {
//         text: "404 Modern",
//         link: "/errors/404-modern",
//         newTab: true,
//       },
//       {
//         text: "504 Modern",
//         link: "/errors/504-modern",
//         newTab: true,
//       },
//     ],
//   },
//   {
//     icon: "files-fill",
//     text: "Other Pages",
//     active: false,
//     subMenu: [
//       {
//         text: "Blank / Startup",
//         link: "/_blank",
//       },
//       {
//         text: "Faqs / Help",
//         link: "/pages/faq",
//       },
//       {
//         text: "Terms / Policy",
//         link: "/pages/terms-policy",
//       },
//       {
//         text: "Regular Page - v1",
//         link: "/pages/regular-v1",
//       },
//       {
//         text: "Regular Page - v2",
//         link: "/pages/regular-v2",
//       },
//     ],
//   },
//   {
//     heading: "Components",
//   },
//   {
//     icon: "layers-fill",
//     text: "Ui Elements",
//     active: false,
//     subMenu: [
//       {
//         text: "Alerts",
//         link: "/components/alerts",
//       },
//       {
//         text: "Accordions",
//         link: "/components/accordions",
//       },
//       {
//         text: "Avatar",
//         link: "/components/avatar",
//       },
//       {
//         text: "Badges",
//         link: "/components/badges",
//       },
//       {
//         text: "Buttons",
//         link: "/components/buttons",
//       },
//       {
//         text: "Button Group",
//         link: "/components/button-group",
//       },
//       {
//         text: "Breadcrumbs",
//         link: "/components/breadcrumbs",
//       },
//       {
//         text: "Cards",
//         link: "/components/cards",
//       },
//       {
//         text: "Carousel",
//         link: "/components/carousel",
//       },
//       {
//         text: "Dropdowns",
//         link: "/components/dropdowns",
//       },
//       {
//         text: "Modals",
//         link: "/components/modals",
//       },
//       {
//         text: "Pagination",
//         link: "/components/pagination",
//       },
//       {
//         text: "Popovers",
//         link: "/components/popovers",
//       },
//       {
//         text: "Progress",
//         link: "/components/progress",
//       },
//       {
//         text: "Spinner",
//         link: "/components/spinner",
//       },
//       {
//         text: "Tabs",
//         link: "/components/tabs",
//       },
//       {
//         text: "Toast",
//         link: "/components/toast",
//       },
//       {
//         text: "Typography",
//         link: "/components/typography",
//       },
//       {
//         text: "Tooltips",
//         link: "/components/tooltips",
//       },
//       {
//         text: "Utilities",
//         active: false,
//         subMenu: [
//           {
//             text: "Borders",
//             link: "/components/util-border",
//           },
//           {
//             text: "Colors",
//             link: "/components/util-colors",
//           },
//           {
//             text: "Display",
//             link: "/components/util-display",
//           },
//           {
//             text: "Embeded",
//             link: "/components/util-embeded",
//           },
//           {
//             text: "Flex",
//             link: "/components/util-flex",
//           },
//           {
//             text: "Text",
//             link: "/components/util-text",
//           },
//           {
//             text: "Sizing",
//             link: "/components/util-sizing",
//           },
//           {
//             text: "Spacing",
//             link: "/components/util-spacing",
//           },
//           {
//             text: "Others",
//             link: "/components/util-others",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     icon: "dot-box-fill",
//     text: "Crafted Icons",
//     active: false,
//     subMenu: [
//       {
//         text: "SVG Icon-Exclusive",
//         link: "/svg-icons",
//       },
//       {
//         text: "Nioicon - HandCrafted",
//         link: "/nioicon",
//       },
//     ],
//   },
//   {
//     icon: "table-view-fill",
//     text: "Tables",
//     active: false,
//     subMenu: [
//       {
//         text: "Basic Tables",
//         link: "/table-basic",
//       },
//       {
//         text: "Special Tables",
//         link: "/table-special",
//       },
//       {
//         text: "DataTables",
//         link: "/table-datatable",
//       },
//     ],
//   },
//   {
//     icon: "view-group-fill",
//     text: "Forms",
//     active: false,
//     subMenu: [
//       {
//         text: "Form Elements",
//         link: "/components/form-elements",
//       },
//       {
//         text: "Checkbox Radio",
//         link: "/components/checkbox-radio",
//       },
//       {
//         text: "Input Group",
//         link: "/components/input-group",
//       },
//       {
//         text: "Form Upload",
//         link: "/components/form-upload",
//       },
//       {
//         text: "Advanced Controls",
//         link: "/components/advanced-control",
//       },
//       {
//         text: "Form Layouts",
//         link: "/components/form-layouts",
//       },
//       {
//         text: "Form Validation",
//         link: "/components/form-validation",
//       },
//       {
//         text: "Date Time Picker",
//         link: "/components/datetime-picker",
//       },
//       {
//         text: "Number Spinner",
//         link: "/components/number-spinner",
//       },
//       {
//         text: "noUiSlider",
//         link: "/components/nouislider",
//       },
//       {
//         text: "Wizard Basic",
//         link: "/components/wizard-basic",
//       },
//       {
//         text: "Rich Editor",
//         active: false,
//         subMenu: [
//           {
//             text: "Quill",
//             link: "/components/quill",
//           },
//           {
//             text: "Tinymce",
//             link: "/components/tinymce",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     icon: "pie-fill",
//     text: "Charts",
//     active: false,
//     subMenu: [
//       {
//         text: "Chart Js",
//         link: "/charts/chartjs",
//       },
//       {
//         text: "Knobs",
//         link: "/charts/knobs",
//       },
//     ],
//   },
//   {
//     icon: "puzzle",
//     text: "Widgets",
//     subMenu: [
//       {
//         text: "Card Widgets",
//         link: "/components/widgets/cards",
//       },
//       {
//         text: "Chart Widgets",
//         link: "/components/widgets/charts",
//       },
//       {
//         text: "Rating Widgets",
//         link: "/components/widgets/rating",
//       },
//     ],
//   },
//   {
//     icon: "block-over",
//     text: "Miscellaneous",
//     subMenu: [
//       {
//         text: "Slick Sliders",
//         link: "/components/misc/slick-slider",
//       },
//       {
//         text: "JsTree",
//         link: "/components/misc/jsTree",
//       },
//       {
//         text: "React Toastify",
//         link: "/components/misc/toastify",
//       },
//       {
//         text: "Sweet Alert",
//         link: "/components/misc/sweet-alert",
//       },
//       {
//         text: "React DualListBox",
//         link: "/components/misc/dual-list",
//       },
//       {
//         text: "React Beautiful Dnd",
//         link: "/components/misc/beautiful-dnd",
//       },
//       {
//         text: "Google Map",
//         link: "/components/misc/map",
//       },
//     ],
//   },
//   {
//     icon: "tag-alt-fill",
//     text: "Email Template",
//     link: "/email-template",
//     active: "false",
//   },
// ];
// export default menu;
