const ApiUrls = {
  master: {
    role: {
      getRole: "/get_role.php",
      manageRole: "/role_management.php",
    },
    ageBrackets: {
      getAgeBrackets: "/get_age_bracket.php",
      addAgeBracket: "/add_age_bracket.php",
    },
    region: {
      getRegion: "/get_region.php",
      manageRegion: "/manage_region.php",
    },
    users: {
      getUsers: "/get_users.php",
      createUser: "/user.php",
      updateUser: "/update_user.php",
    },
    states: {
      getStates: "/get_states.php",
      manageStates: "/manage_state.php",
    },
    rejectionReasons: {
      getRejectionReasons: "/get_rejecting_reason.php",
      manageRejectionReasons: "/manage_rejecting_reason.php",
    },
    categories: {
      getCategories: "/get_category.php",
      manageCategories: "/manage_category.php",
    },
    city: {
      getCity: "/get_city.php",
      manageCity: "/manage_city.php",
    },
    contestType: {
      getContestType: "/get_contest_type.php",
      manageContestType: "/manage_contest_type.php",
    },
    gallery: {
      getGallery: "/get_gallery.php",
      manageGallery: "/manage_gallery.php",
    },
    judgingParameters: {
      getJudgingParameters: "/get_judging.php",
      manageJudgingParameters: "/manage_judging.php",
    },
    prize: {
      getPrize: "/get_prize.php",
      managePrize: "/manage_prize.php",
    },
    starBucks: {
      getStarBucks: "/get_startbucks.php",
      manageStarBucks: "/manage_startbucks.php",
    },
  },
  auth: {
    login: "/userlogin.php",
    register: "/user.php",
    forgotPassword: "/forget_password.php",
  },
  contest: {
    create_contest: "/create_contest.php",
    get_contest: "/get_contest.php",
  },
  users: {
    getUserInfo: "/getuseinfo.php",
  },
};

export default ApiUrls;
