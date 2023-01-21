const ApiUrls = {
  master: {
    role: {
      getRole: "/get_role.php",
      manageRole: "/role_management.php",
      changeRole: "/change_user_role.php",
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
      changePassword: "/change_password.php"
    },
    states: {
      getStates: "/get_states.php",
      manageStates: "/manage_state.php",
    },
    district: {
      getDistrict: "/get_district.php",
      manageDistrict: "/manage_district.php",
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
      manageJudgingAssignment: "/assign_judge.php",
    },
    prize: {
      getPrize: "/get_prize.php",
      managePrize: "/manage_prize.php",
    },
    starBucks: {
      getStarBucks: "/get_startbucks.php",
      manageStarBucks: "/manage_startbucks.php",
    },
    section: {
      getClassSectionHouseStream: "/get_class_house_section_stream.php",
      manageClassSectionHouseStream: "/class_section_house_stream.php",
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
    manageContest: "/manage_contest.php",
    getAppliedContest: "/get_applied_contest.php",
    manageSubmitJudgeEntry: "/submit_judging.php"
  },
  users: {
    getUserInfo: "/getuseinfo.php",
  },
  helpDesk: {
    manageHelpDesk: "/insert_query.php",
  },
  childrenEnroll: {
    enroll: "/children_enroll.php",
  },
  school: {
    getSchoolCenterList: "/get_school_center.php",
    getSchoolCenter: "/get_school_center.php",
    manageSchoolCenter: "/manage_school_center.php",
  },
  ageProof: {
    getAgeProof: "/get_age_proof.php",
    manageAgeProof: "/manage_age_proof.php",
  },
  clientAdmin: {
    get_contest: "/get_contest_client_admin.php",
    manageContest: "/manage_contest_client_admin.php",
  },
};

export default ApiUrls;
