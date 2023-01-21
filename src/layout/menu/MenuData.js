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
    text: `Kidz Lounge`,
    link: `${process.env.PUBLIC_URL}/dashboard`,
  },
  {
    icon: Participate,
    text: `Participate`,
    link: `${process.env.PUBLIC_URL}/participate`,
  },
  {
    icon: Gallery,
    text: `My Gallery`,
    link: `${process.env.PUBLIC_URL}/gallery`,
  },
  {
    icon: Downloads,
    text: `Downloads`,
    link: `${process.env.PUBLIC_URL}/downloads`,
  },
  {
    icon: OldContests,
    text: `My Old Contests`,
    link: `${process.env.PUBLIC_URL}/old-contests`,
  },
  {
    icon: Help,
    text: `Helpdesk`,
    link: `${process.env.PUBLIC_URL}/help`,
  },
  /*{
    icon: StarBucks,
    text:`Star-Bucks`,
    link:`${process.env.PUBLIC_URL}/starbucks`,
  },*/

  {
    icon: StarBucks,
    text: `Purchase Star-Bucks`,
    link: `${process.env.PUBLIC_URL}/buy_starbucks`,
  },

  // {
  //   icon: Contest,
  //   text:`Contest`,
  //   active: false,
  //   subMenu: [
  //     // {
  //     //   text:`Contests`,
  //     //   link:`${process.env.PUBLIC_URL}//contests`,
  //     // },
  //     // {
  //     //   text:`Judging`,
  //     //   link:`${process.env.PUBLIC_URL}//judging`,
  //     // },
  //   ],
  // },
  // {
  //   icon: Judging,
  //   text:`Judging`,
  //   link:`${process.env.PUBLIC_URL}//judging`,
  //   // active: false,
  //   // subMenu: [],
  // },
  // {
  //   icon: Verification,
  //   text:`Verification`,
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Reports,
  //   text:`Reports`,
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Masters,
  //   text:`Masters`,
  //   active: false,
  //   subMenu: [],
  // },
  // {
  //   icon: Settings,
  //   text:`Settings`,
  //   active: false,
  //   subMenu: [],
  // },
];

const user = JSON.parse(localStorage.getItem("user"))?.data;

if (user?.role.search(/contest_manager/) === 0) {
  menu = [
    {
      icon: Kidz,
      text: `Dashboard`,
      link: `${process.env.PUBLIC_URL}/content_dashboard`,
    },
    {
      icon: StarBucks,
      text: `Create Contest`,
      link: `${process.env.PUBLIC_URL}/create-contest`,
    },
    {
      icon: StarBucks,
      text: `Monitor Contest`,
      link: `${process.env.PUBLIC_URL}/monitor-contest`,
    },
    {
      icon: StarBucks,
      text: `Close Contest`,
      link: `${process.env.PUBLIC_URL}/close-contest`,
    },
    /*    {
      icon: StarBucks,
      text:`Leave management`,
      link:`${process.env.PUBLIC_URL}/leave-management`,
    },
  */
    {
      icon: StarBucks,
      text: `Result Preparation and announcement`,
      link: `${process.env.PUBLIC_URL}/result-preparation-and-announcement`,
    },
    /*   {
      icon: StarBucks,
      text:`Generation of Certificates`,
      link:`${process.env.PUBLIC_URL}/generation-of-certificates`,
    },
  */
  ];
}

if (user?.role.search(/quality_analyst/) === 0) {
  menu = [
    {
      icon: Kidz,
      text: `Dashboard`,
      link: `${process.env.PUBLIC_URL}/content_dashboard`,
    },
    {
      icon: StarBucks,
      text: `Verify Contestants`,
      link: `${process.env.PUBLIC_URL}/verify-contestant`,
    },
    {
      icon: StarBucks,
      text: `Manage Contestant Entries`,
      link: `${process.env.PUBLIC_URL}/manage-contestant`,
    },
    {
      icon: StarBucks,
      text: `Verify Age Proof`,
      link: `${process.env.PUBLIC_URL}/verify-age`,
    },
    {
      icon: StarBucks,
      text: `Request To Assign Task`,
      link: `${process.env.PUBLIC_URL}/ask_for_more_work`,
    },
  ];
}

if (user?.role.search(/judge/) === 0) {
  menu = [
    {
      icon: StarBucks,
      text: `Dashboard`,
      link: `${process.env.PUBLIC_URL}/judge_dashboard`,
    },

    {
      icon: StarBucks,
      text: `Judge Entries`,
      link: `${process.env.PUBLIC_URL}/judge_gallery`,
    },
  ];
}

if (user?.role.search(/client_admin/) === 0) {
  menu = [
    {
      icon: StarBucks,
      text: `Dashboard`,
      link: `${process.env.PUBLIC_URL}/client_dashboard`,
    },

    {
      icon: StarBucks,
      text: `Role Management`,
      link: `${process.env.PUBLIC_URL}/roles`,
    },
    {
      icon: StarBucks,
      text: `User Creation`,
      link: `${process.env.PUBLIC_URL}/users`,
    },
    {
      icon: StarBucks,
      text: `Children Enrollment`,
      link: `${process.env.PUBLIC_URL}/children_enrollments`,
    },
    /* {
      icon: StarBucks,
      text:`Unique Id Generation`,
      link:`${process.env.PUBLIC_URL}/old-contests`,
    },
  */
    {
      icon: StarBucks,
      text: `Class Master`,
      link: `${process.env.PUBLIC_URL}/class_master`,
    },
    {
      icon: StarBucks,
      text: `Section Master`,
      link: `${process.env.PUBLIC_URL}/section_master`,
    },
    {
      icon: StarBucks,
      text: `House Master`,
      link: `${process.env.PUBLIC_URL}/house_master`,
    },
    {
      icon: StarBucks,
      text: `Stream Master`,
      link: `${process.env.PUBLIC_URL}/stream_master`,
    },
    {
      icon: StarBucks,
      text: `Create Contest`,
      link: `${process.env.PUBLIC_URL}/create-contest`,
    },
    {
      icon: StarBucks,
      text: `View Contest`,
      link: `${process.env.PUBLIC_URL}/view-contest`,
    },
  ];
}

if (user?.role.search(/administrator/) === 0) {
  menu = [
    {
      icon: Kidz,
      text: `Dashboard`,
      link: `${process.env.PUBLIC_URL}/dashboard`,
    },

    {
      icon: Contest,
      text: `Contests`,
      active: false,
      subMenu: [
        /*{
      icon: StarBucks,
      text:`Contest Type `,
      link:`${process.env.PUBLIC_URL}/content_types`,
    },
    {
      icon: StarBucks,
      text:`Contest Category`,
      link:`${process.env.PUBLIC_URL}/contest_categories`,
    },
  	
    {
      icon: StarBucks,
      text:`Mange contest`,
      link:`${process.env.PUBLIC_URL}/CONTEST`,
    },
     {
      icon: StarBucks,
      text:`Close Judging Level`,
      link:`${process.env.PUBLIC_URL}/help`,
      }*/

        {
          icon: StarBucks,
          text: `Create Contest`,
          link: `${process.env.PUBLIC_URL}/create-contest`,
        },
        {
          icon: StarBucks,
          text: `Monitor Contest`,
          link: `${process.env.PUBLIC_URL}/monitor-contest`,
        },
        {
          icon: StarBucks,
          text: `Close Contest`,
          link: `${process.env.PUBLIC_URL}/close-contest`,
        },
        {
          icon: StarBucks,
          text: `Result Preparation and announcement`,
          link: `${process.env.PUBLIC_URL}/result-preparation-and-announcement`,
        },
      ],
    },
    {
      icon: Judging,
      text: `Judgings`,
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: `Judge Entries`,
          link: `${process.env.PUBLIC_URL}/judge_gallery`,
        },
        /*	{
      icon: StarBucks,
      text:`judging parameter `,
      link:`${process.env.PUBLIC_URL}/judging_parameters`,
    },
    {
      icon: StarBucks,
      text:`prize master`,
      link:`${process.env.PUBLIC_URL}/prizes`,
    },
    */
      ],
    },
    {
      icon: Verification,
      text: `Verification`,
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: `Manage Registrations`,
          link: `${process.env.PUBLIC_URL}/content_dashboard`,
        },
        {
          icon: StarBucks,
          text: `Manage Entries`,
          link: `${process.env.PUBLIC_URL}/judge_dashboard`,
        },
      ],
    },

    {
      icon: Reports,
      text: `Reports`,
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: `Registrations Report`,
          link: `${process.env.PUBLIC_URL}/registration_report`,
        },
        {
          icon: StarBucks,
          text: `Contest Entry`,
          link: `${process.env.PUBLIC_URL}/contest_entries`,
        },
        {
          icon: StarBucks,
          text: `Login Report`,
          link: `${process.env.PUBLIC_URL}/login_reports`,
        },
      ],
    },

    {
      icon: Masters,
      text: `Masters`,
      active: false,
      subMenu: [
        {
          icon: StarBucks,
          text: `Role Management`,
          link: `${process.env.PUBLIC_URL}/roles`,
        },
        {
          icon: StarBucks,
          text: `User Creation`,
          link: `${process.env.PUBLIC_URL}/users`,
        },

        {
          icon: StarBucks,
          text: `Region Management`,
          link: `${process.env.PUBLIC_URL}/regions`,
        },
        {
          icon: StarBucks,
          text: `State Management`,
          link: `${process.env.PUBLIC_URL}/states`,
        },
        {
          icon: StarBucks,
          text: `District Management`,
          link: `${process.env.PUBLIC_URL}/district`,
        },
        {
          icon: StarBucks,
          text: `City Management`,
          link: `${process.env.PUBLIC_URL}/cities`,
        },
        {
          icon: StarBucks,
          text: `Brackets Management`,
          link: `${process.env.PUBLIC_URL}/brackets`,
        },
        {
          icon: StarBucks,
          text: `Contest Type Management`,
          link: `${process.env.PUBLIC_URL}/content_types`,
        },
        {
          icon: StarBucks,
          text: `Contest Category Management`,
          link: `${process.env.PUBLIC_URL}/contest_categories`,
        },
        {
          icon: StarBucks,
          text: `Star Buck Master`,
          link: `${process.env.PUBLIC_URL}/starbucks`,
        },
        {
          icon: StarBucks,
          text: `Judging Parameter `,
          link: `${process.env.PUBLIC_URL}/judging_parameters`,
        },
        {
          icon: StarBucks,
          text: `Prize Master`,
          link: `${process.env.PUBLIC_URL}/prizes`,
        },

      ],
    },
    {
      icon: StarBucks,
      text: `Rejection Reason Management`,
      link: `${process.env.PUBLIC_URL}/rejection_reason`,
    },
     {
      icon: StarBucks,
      text: `School Center`,
      link: `${process.env.PUBLIC_URL}/school_center`,
    },

    {
      icon: Help,
      text: `Helpdesk`,
      link: `${process.env.PUBLIC_URL}/help`,
    },
    {
      icon: Help,
      text: `Photo Editor`,
      link: `https://starkids.thefitnesssfactory.com/photoeditor/index.php`,
    },

    /*
  {
      icon: StarBucks,
      text:`Photo Editor`,
      link:`${process.env.PUBLIC_URL}/City`,
    },
	
  {
      icon: StarBucks,
      text:`Assigning Entries To Qa`,
      link:`${process.env.PUBLIC_URL}/City`,
    },
  {
      icon: StarBucks,
      text:`Assigning Entries To Qa On Request`,
      link:`${process.env.PUBLIC_URL}/City`,
    },
  {
      icon: StarBucks,
      text:`Reassigning Entries To Qa`,
      link:`${process.env.PUBLIC_URL}/City`,
    },
  {
      icon: StarBucks,
      text:`Event Knowledge Series Creation`,
      link:`${process.env.PUBLIC_URL}/City`,
    },
  {
      icon: StarBucks,
      text:`Schedule Stakeholders Leave`,
      link:`${process.env.PUBLIC_URL}/City`,
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
//     heading:`Use-case preview`,
//   },
//   {
//     icon:`bag`,
//     text:`E-Commerce Panel`,
//     link:`${process.env.PUBLIC_URL}//ecommerce/index`,
//     panel: true,
//     newTab: true,
//     subPanel: [
//       {
//         icon:`dashboard-fill`,
//         text:`Dashboard`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/index`,
//       },
//       {
//         icon:`bag-fill`,
//         text:`Orders`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/orders`,
//       },
//       {
//         icon:`package-fill`,
//         text:`Products`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/products`,
//       },
//       {
//         icon:`users-fill`,
//         text:`Customers`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/customer`,
//       },
//       {
//         icon:`chat-fill`,
//         text:`Support`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/support`,
//       },
//       {
//         icon:`opt-alt-fill`,
//         text:`Settings`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/settings`,
//       },
//       {
//         icon:`server-fill`,
//         text:`Integration`,
//         link:`${process.env.PUBLIC_URL}//ecommerce/integration`,
//       },
//     ],
//   },
//   {
//     heading:`Dashboards`,
//   },
//   {
//     icon:`cart-fill`,
//     text:`Default`,
//     link:`${process.env.PUBLIC_URL}//`,
//   },
//   {
//     icon:`activity-round-fill`,
//     text:`Sales`,
//     link:`${process.env.PUBLIC_URL}//sales`,
//   },
//   {
//     icon:`growth-fill`,
//     text:`Analytics`,
//     link:`${process.env.PUBLIC_URL}//analytics`,
//   },
//   {
//     heading:`Pre-built Pages`,
//   },
//   {
//     icon:`tile-thumb-fill`,
//     text:`Projects`,
//     active: false,
//     subMenu: [
//       {
//         text:`Project Cards`,
//         link:`${process.env.PUBLIC_URL}//project-card`,
//       },
//       {
//         text:`Project List`,
//         link:`${process.env.PUBLIC_URL}//project-list`,
//       },
//     ],
//   },
//   {
//     icon:`users-fill`,
//     text:`User Manage`,
//     active: false,
//     subMenu: [
//       {
//         text:`User List - Default`,
//         link:`${process.env.PUBLIC_URL}//user-list-default`,
//       },
//       {
//         text:`User List - Regular`,
//         link:`${process.env.PUBLIC_URL}//user-list-regular`,
//       },
//       {
//         text:`User List - Compact`,
//         link:`${process.env.PUBLIC_URL}//user-list-compact`,
//       },
//       {
//         text:`User Details - Regular`,
//         link:`${process.env.PUBLIC_URL}//user-details-regular/1`,
//       },
//       {
//         text:`User Profile - Regular`,
//         link:`${process.env.PUBLIC_URL}//user-profile-regular`,
//       },
//       {
//         text:`User Contact - Card`,
//         link:`${process.env.PUBLIC_URL}//user-contact-card`,
//       },
//     ],
//   },

//   {
//     icon:`cc-alt2-fill`,
//     text:`Orders`,
//     active: false,
//     subMenu: [
//       {
//         text:`Order List - Default`,
//         link:`${process.env.PUBLIC_URL}//order-list-default`,
//       },
//       {
//         text:`Order List - Regular`,
//         link:`${process.env.PUBLIC_URL}//order-list-regular`,
//       },
//       {
//         text:`Order List - Sales`,
//         link:`${process.env.PUBLIC_URL}//order-list-sales`,
//       },
//     ],
//   },
//   {
//     icon:`file-docs`,
//     text:`AML / KYCs`,
//     active: false,
//     subMenu: [
//       {
//         text:`KYC List - Regular`,
//         link:`${process.env.PUBLIC_URL}//kyc-list-regular`,
//       },
//       {
//         text:`KYC Details - Regular`,
//         link:`${process.env.PUBLIC_URL}//kyc-details-regular/UD01544`,
//       },
//     ],
//   },
//   {
//     icon:`grid-alt-fill`,
//     text:`Applications`,
//     active: false,
//     subMenu: [
//       {
//         text:`Messages`,
//         link:`${process.env.PUBLIC_URL}//app-messages`,
//       },
//       {
//         text:`Chats / Messenger`,
//         link:`${process.env.PUBLIC_URL}//app-chat`,
//       },
//       {
//         text:`Inbox / Mail`,
//         link:`${process.env.PUBLIC_URL}//app-inbox`,
//       },
//       {
//         text:`Calendar`,
//         link:`${process.env.PUBLIC_URL}//app-calender`,
//       },
//       {
//         text:`Kanban Board`,
//         link:`${process.env.PUBLIC_URL}//app-kanban`,
//       },
//       {
//         text:`File Manager`,
//         link:`${process.env.PUBLIC_URL}//app-file-manager`,
//         badge:`new`,
//       },
//     ],
//   },
//   {
//     icon:`card-view`,
//     text:`Products`,
//     active: false,
//     subMenu: [
//       {
//         text:`Product List`,
//         link:`${process.env.PUBLIC_URL}//product-list`,
//       },
//       {
//         text:`Product Card`,
//         link:`${process.env.PUBLIC_URL}//product-card`,
//       },
//       {
//         text:`Product Details`,
//         link:`${process.env.PUBLIC_URL}//product-details/0`,
//       },
//     ],
//   },
//   {
//     icon:`file-docs`,
//     text:`Invoice`,
//     active: false,
//     subMenu: [
//       {
//         text:`Invoice List`,
//         link:`${process.env.PUBLIC_URL}//invoice-list`,
//       },
//       {
//         text:`Invoice Details`,
//         link:`${process.env.PUBLIC_URL}//invoice-details/1`,
//       },
//     ],
//   },
//   {
//     icon:`view-col`,
//     text:`Pricing Table`,
//     link:`${process.env.PUBLIC_URL}//pricing-table`,
//   },
//   {
//     icon:`img`,
//     text:`Image Gallery`,
//     link:`${process.env.PUBLIC_URL}//image-gallery`,
//   },
//   {
//     heading:`Misc Pages`,
//   },
//   {
//     icon:`light-fill`,
//     text:`Auth Pages`,
//     active: false,
//     subMenu: [
//       {
//         text:`Login / Signin`,
//         link:`${process.env.PUBLIC_URL}//login`,
//         newTab: true,
//       },
//       {
//         text:`Register / Signup`,
//         link:`${process.env.PUBLIC_URL}//register`,
//         newTab: true,
//       },
//       {
//         text:`Forgot Password`,
//         link:`${process.env.PUBLIC_URL}//reset`,
//         newTab: true,
//       },
//       {
//         text:`Success / Confirm`,
//         link:`${process.env.PUBLIC_URL}//auth-success`,
//         newTab: true,
//       },
//     ],
//   },
//   {
//     icon:`files-fill`,
//     text:`Error Pages`,
//     active: false,
//     subMenu: [
//       {
//         text:`404 Classic`,
//         link:`${process.env.PUBLIC_URL}//errors/404-classic`,
//         newTab: true,
//       },
//       {
//         text:`504 Classic`,
//         link:`${process.env.PUBLIC_URL}//errors/504-classic`,
//         newTab: true,
//       },
//       {
//         text:`404 Modern`,
//         link:`${process.env.PUBLIC_URL}//errors/404-modern`,
//         newTab: true,
//       },
//       {
//         text:`504 Modern`,
//         link:`${process.env.PUBLIC_URL}//errors/504-modern`,
//         newTab: true,
//       },
//     ],
//   },
//   {
//     icon:`files-fill`,
//     text:`Other Pages`,
//     active: false,
//     subMenu: [
//       {
//         text:`Blank / Startup`,
//         link:`${process.env.PUBLIC_URL}//_blank`,
//       },
//       {
//         text:`Faqs / Help`,
//         link:`${process.env.PUBLIC_URL}//pages/faq`,
//       },
//       {
//         text:`Terms / Policy`,
//         link:`${process.env.PUBLIC_URL}//pages/terms-policy`,
//       },
//       {
//         text:`Regular Page - v1`,
//         link:`${process.env.PUBLIC_URL}//pages/regular-v1`,
//       },
//       {
//         text:`Regular Page - v2`,
//         link:`${process.env.PUBLIC_URL}//pages/regular-v2`,
//       },
//     ],
//   },
//   {
//     heading:`Components`,
//   },
//   {
//     icon:`layers-fill`,
//     text:`Ui Elements`,
//     active: false,
//     subMenu: [
//       {
//         text:`Alerts`,
//         link:`${process.env.PUBLIC_URL}//components/alerts`,
//       },
//       {
//         text:`Accordions`,
//         link:`${process.env.PUBLIC_URL}//components/accordions`,
//       },
//       {
//         text:`Avatar`,
//         link:`${process.env.PUBLIC_URL}//components/avatar`,
//       },
//       {
//         text:`Badges`,
//         link:`${process.env.PUBLIC_URL}//components/badges`,
//       },
//       {
//         text:`Buttons`,
//         link:`${process.env.PUBLIC_URL}//components/buttons`,
//       },
//       {
//         text:`Button Group`,
//         link:`${process.env.PUBLIC_URL}//components/button-group`,
//       },
//       {
//         text:`Breadcrumbs`,
//         link:`${process.env.PUBLIC_URL}//components/breadcrumbs`,
//       },
//       {
//         text:`Cards`,
//         link:`${process.env.PUBLIC_URL}//components/cards`,
//       },
//       {
//         text:`Carousel`,
//         link:`${process.env.PUBLIC_URL}//components/carousel`,
//       },
//       {
//         text:`Dropdowns`,
//         link:`${process.env.PUBLIC_URL}//components/dropdowns`,
//       },
//       {
//         text:`Modals`,
//         link:`${process.env.PUBLIC_URL}//components/modals`,
//       },
//       {
//         text:`Pagination`,
//         link:`${process.env.PUBLIC_URL}//components/pagination`,
//       },
//       {
//         text:`Popovers`,
//         link:`${process.env.PUBLIC_URL}//components/popovers`,
//       },
//       {
//         text:`Progress`,
//         link:`${process.env.PUBLIC_URL}//components/progress`,
//       },
//       {
//         text:`Spinner`,
//         link:`${process.env.PUBLIC_URL}//components/spinner`,
//       },
//       {
//         text:`Tabs`,
//         link:`${process.env.PUBLIC_URL}//components/tabs`,
//       },
//       {
//         text:`Toast`,
//         link:`${process.env.PUBLIC_URL}//components/toast`,
//       },
//       {
//         text:`Typography`,
//         link:`${process.env.PUBLIC_URL}//components/typography`,
//       },
//       {
//         text:`Tooltips`,
//         link:`${process.env.PUBLIC_URL}//components/tooltips`,
//       },
//       {
//         text:`Utilities`,
//         active: false,
//         subMenu: [
//           {
//             text:`Borders`,
//             link:`${process.env.PUBLIC_URL}//components/util-border`,
//           },
//           {
//             text:`Colors`,
//             link:`${process.env.PUBLIC_URL}//components/util-colors`,
//           },
//           {
//             text:`Display`,
//             link:`${process.env.PUBLIC_URL}//components/util-display`,
//           },
//           {
//             text:`Embeded`,
//             link:`${process.env.PUBLIC_URL}//components/util-embeded`,
//           },
//           {
//             text:`Flex`,
//             link:`${process.env.PUBLIC_URL}//components/util-flex`,
//           },
//           {
//             text:`Text`,
//             link:`${process.env.PUBLIC_URL}//components/util-text`,
//           },
//           {
//             text:`Sizing`,
//             link:`${process.env.PUBLIC_URL}//components/util-sizing`,
//           },
//           {
//             text:`Spacing`,
//             link:`${process.env.PUBLIC_URL}//components/util-spacing`,
//           },
//           {
//             text:`Others`,
//             link:`${process.env.PUBLIC_URL}//components/util-others`,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     icon:`dot-box-fill`,
//     text:`Crafted Icons`,
//     active: false,
//     subMenu: [
//       {
//         text:`SVG Icon-Exclusive`,
//         link:`${process.env.PUBLIC_URL}//svg-icons`,
//       },
//       {
//         text:`Nioicon - HandCrafted`,
//         link:`${process.env.PUBLIC_URL}//nioicon`,
//       },
//     ],
//   },
//   {
//     icon:`table-view-fill`,
//     text:`Tables`,
//     active: false,
//     subMenu: [
//       {
//         text:`Basic Tables`,
//         link:`${process.env.PUBLIC_URL}//table-basic`,
//       },
//       {
//         text:`Special Tables`,
//         link:`${process.env.PUBLIC_URL}//table-special`,
//       },
//       {
//         text:`DataTables`,
//         link:`${process.env.PUBLIC_URL}//table-datatable`,
//       },
//     ],
//   },
//   {
//     icon:`view-group-fill`,
//     text:`Forms`,
//     active: false,
//     subMenu: [
//       {
//         text:`Form Elements`,
//         link:`${process.env.PUBLIC_URL}//components/form-elements`,
//       },
//       {
//         text:`Checkbox Radio`,
//         link:`${process.env.PUBLIC_URL}//components/checkbox-radio`,
//       },
//       {
//         text:`Input Group`,
//         link:`${process.env.PUBLIC_URL}//components/input-group`,
//       },
//       {
//         text:`Form Upload`,
//         link:`${process.env.PUBLIC_URL}//components/form-upload`,
//       },
//       {
//         text:`Advanced Controls`,
//         link:`${process.env.PUBLIC_URL}//components/advanced-control`,
//       },
//       {
//         text:`Form Layouts`,
//         link:`${process.env.PUBLIC_URL}//components/form-layouts`,
//       },
//       {
//         text:`Form Validation`,
//         link:`${process.env.PUBLIC_URL}//components/form-validation`,
//       },
//       {
//         text:`Date Time Picker`,
//         link:`${process.env.PUBLIC_URL}//components/datetime-picker`,
//       },
//       {
//         text:`Number Spinner`,
//         link:`${process.env.PUBLIC_URL}//components/number-spinner`,
//       },
//       {
//         text:`noUiSlider`,
//         link:`${process.env.PUBLIC_URL}//components/nouislider`,
//       },
//       {
//         text:`Wizard Basic`,
//         link:`${process.env.PUBLIC_URL}//components/wizard-basic`,
//       },
//       {
//         text:`Rich Editor`,
//         active: false,
//         subMenu: [
//           {
//             text:`Quill`,
//             link:`${process.env.PUBLIC_URL}//components/quill`,
//           },
//           {
//             text:`Tinymce`,
//             link:`${process.env.PUBLIC_URL}//components/tinymce`,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     icon:`pie-fill`,
//     text:`Charts`,
//     active: false,
//     subMenu: [
//       {
//         text:`Chart Js`,
//         link:`${process.env.PUBLIC_URL}//charts/chartjs`,
//       },
//       {
//         text:`Knobs`,
//         link:`${process.env.PUBLIC_URL}//charts/knobs`,
//       },
//     ],
//   },
//   {
//     icon:`puzzle`,
//     text:`Widgets`,
//     subMenu: [
//       {
//         text:`Card Widgets`,
//         link:`${process.env.PUBLIC_URL}//components/widgets/cards`,
//       },
//       {
//         text:`Chart Widgets`,
//         link:`${process.env.PUBLIC_URL}//components/widgets/charts`,
//       },
//       {
//         text:`Rating Widgets`,
//         link:`${process.env.PUBLIC_URL}//components/widgets/rating`,
//       },
//     ],
//   },
//   {
//     icon:`block-over`,
//     text:`Miscellaneous`,
//     subMenu: [
//       {
//         text:`Slick Sliders`,
//         link:`${process.env.PUBLIC_URL}//components/misc/slick-slider`,
//       },
//       {
//         text:`JsTree`,
//         link:`${process.env.PUBLIC_URL}//components/misc/jsTree`,
//       },
//       {
//         text:`React Toastify`,
//         link:`${process.env.PUBLIC_URL}//components/misc/toastify`,
//       },
//       {
//         text:`Sweet Alert`,
//         link:`${process.env.PUBLIC_URL}//components/misc/sweet-alert`,
//       },
//       {
//         text:`React DualListBox`,
//         link:`${process.env.PUBLIC_URL}//components/misc/dual-list`,
//       },
//       {
//         text:`React Beautiful Dnd`,
//         link:`${process.env.PUBLIC_URL}//components/misc/beautiful-dnd`,
//       },
//       {
//         text:`Google Map`,
//         link:`${process.env.PUBLIC_URL}//components/misc/map`,
//       },
//     ],
//   },
//   {
//     icon:`tag-alt-fill`,
//     text:`Email Template`,
//     link:`${process.env.PUBLIC_URL}//email-template`,
//     active:`false`,
//   },
// ];
// export default menu;
