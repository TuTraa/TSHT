import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isApps, setIsApps] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isBaseUi, setIsBaseUi] = useState(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState(false);
  const [isForms, setIsForms] = useState(false);
  const [isTables, setIsTables] = useState(false);
  const [isCharts, setIsCharts] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isMaps, setIsMaps] = useState(false);
  const [isMultiLevel, setIsMultiLevel] = useState(false);

  // Apps
  const [isEmail, setEmail] = useState(false);
  const [isSubEmail, setSubEmail] = useState(false);
  const [isEcommerce, setIsEcommerce] = useState(false);
  const [isProjects, setIsProjects] = useState(false);
  const [isTasks, setIsTasks] = useState(false);
  const [isCRM, setIsCRM] = useState(false);
  const [isCrypto, setIsCrypto] = useState(false);
  const [isInvoices, setIsInvoices] = useState(false);
  const [isSupportTickets, setIsSupportTickets] = useState(false);
  const [isNFTMarketplace, setIsNFTMarketplace] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isJobList, setIsJobList] = useState(false);
  const [isCandidateList, setIsCandidateList] = useState(false);

  // Authentication
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isPasswordCreate, setIsPasswordCreate] = useState(false);
  const [isLockScreen, setIsLockScreen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isError, setIsError] = useState(false);

  // Pages
  const [isProfile, setIsProfile] = useState(false);
  const [isLanding, setIsLanding] = useState(false);

  // Charts
  const [isApex, setIsApex] = useState(false);

  // Multi Level
  const [isLevel1, setIsLevel1] = useState(false);
  const [isLevel2, setIsLevel2] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  //TSHT
  const [isHome, setIsHome] = useState(false);
  const [isArticle, setIsArticle] = useState(false);
  const [isCategory, setIsCategory] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [isLiveChannel, setIsLiveChannel] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [isArticlePrice, setIsArticlePrice] = useState(false);
  const [isHotArticle, setIsHotArticle] = useState(false);
  const [isRole, setIsRole] = useState(false);
  const [isDepartment, setIsDepartment] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const [isInteraction, setIsInteraction] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }
  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Article") {
      setIsArticle(false);
    }
    if (iscurrentState !== "Category") {
      setIsCategory(false);
    }
    if (iscurrentState !== "Tag") {
      setIsTag(false);
    }
    if (iscurrentState !== "LiveChannel") {
      setIsLiveChannel(false);
    }
    if (iscurrentState !== "Process") {
      setIsProcess(false);
    }
    if (iscurrentState !== "HotArticle") {
      setIsHotArticle(false);
    }
    if (iscurrentState !== "Role") {
      setIsRole(false);
    }
    if (iscurrentState !== "Department") {
      setIsDepartment(false);
    }
    if (iscurrentState !== "Account") {
      setIsAccount(false);
    }
  }, [
    history,
    iscurrentState,
    isArticle,
    isCategory,
    isTag,
    isProcess,
    isHotArticle,
    isRole,
    isDepartment,
    isAccount,
  ]);

  const menuItems = [
    {
      id: "dashboard-home",
      label: "Tổng quan",
      icon: "ri-dashboard-2-line",
      link: "/home",
    },
    {
      id: "article",
      label: "Quản lý bài viết",
      icon: "mdi mdi-file-document-edit-outline",
      link: "/article",
      stateVariables: isArticle,
      click: function (e) {
        e.preventDefault();
        setIsArticle(!isArticle);
        setIscurrentState("Article");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-article",
          label: "Thêm bài viết",
          link: "/add-article",
          parentId: "article",
        },
        {
          id: "list-article",
          label: "Danh sách bài viết",
          link: "/list-article",
          parentId: "article",
        },
        {
          id: "list-article-2",
          label: "Danh sách bài viết 2",
          link: "/list-article-2",
          parentId: "article2",
        },
      ],
    },
    {
      id: "category",
      label: "Quản lý chuyên mục",
      icon: "ri-dashboard-line",
      link: "/category",
      stateVariables: isCategory,
      click: function (e) {
        e.preventDefault();
        setIsCategory(!isCategory);
        setIscurrentState("Category");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-category",
          label: "Thêm chuyên mục",
          link: "/add-category",
          parentId: "category",
        },
        {
          id: "list-category",
          label: "Danh sách chuyên mục",
          link: "/list-category",
          parentId: "category",
        },
      ],
    },
    {
      id: "tag",
      label: "Quản lý tag",
      icon: "bx bx-purchase-tag",
      link: "/tag",
      stateVariables: isTag,
      click: function (e) {
        e.preventDefault();
        setIsTag(!isTag);
        setIscurrentState("Tag");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-tag",
          label: "Thêm tag",
          link: "/add-tag",
          parentId: "tag",
        },
        {
          id: "list-tag",
          label: "Danh sách tag",
          link: "/list-tag",
          parentId: "tag",
        },
      ],
    },
    {
      id: "live-channel",
      label: "Quản lý Kênh",
      icon: "mdi mdi-television-box",
      link: "/live-channel",
      stateVariables: isLiveChannel,
      click: function (e) {
        e.preventDefault();
        setIsLiveChannel(!isLiveChannel);
        setIscurrentState("LiveChannel");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-live-channel",
          label: "Thêm kênh",
          link: "/add-live-channel",
          parentId: "live-channel",
        },
        {
          id: "list-live-channel",
          label: "Danh sách kênh",
          link: "/list-live-channel",
          parentId: "live-channel",
        },
      ],
    },
    {
      id: "comment",
      label: "Quản lý bình luận",
      icon: "mdi mdi-message-reply-outline",
      link: "/comment",
    },
    {
      id: "process",
      label: "Quản lý quy trình",
      icon: "mdi mdi-nfc-tap",
      link: "/process",
      stateVariables: isProcess,
      click: function (e) {
        e.preventDefault();
        setIsProcess(!isProcess);
        setIscurrentState("Process");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-process",
          label: "Thêm quy trình",
          link: "/add-process",
          parentId: "process",
        },
        {
          id: "list-process",
          label: "Danh sách quy trình",
          link: "/list-process",
          parentId: "process",
        },
      ],
    },
    {
      id: "article-price",
      label: "Nhuận bút",
      icon: "mdi mdi-piggy-bank-outline",
      link: "/article-price",
    },
    {
      id: "hot-article",
      label: "Thiết lập tin nổi bật",
      icon: "mdi mdi-newspaper-variant-outline",
      link: "/hot-article",
      stateVariables: isHotArticle,
      click: function (e) {
        e.preventDefault();
        setIsHotArticle(!isHotArticle);
        setIscurrentState("HotArticle");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "oustanding",
          label: "Tin nổi bật",
          link: "/oustanding",
          parentId: "hot-article",
        },
        {
          id: "is-selected",
          label: "Tin tiêu điểm",
          link: "/is-selected",
          parentId: "hot-article",
        },
      ],
    },
    {
      id: "role",
      label: "Quản lý nhóm quyền",
      icon: "mdi mdi-account-group-outline",
      link: "/role",
      stateVariables: isRole,
      click: function (e) {
        e.preventDefault();
        setIsRole(!isRole);
        setIscurrentState("Role");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-role",
          label: "Thêm nhóm quyền",
          link: "/add-role",
          parentId: "role",
        },
        {
          id: "list-role",
          label: "Danh sách nhóm quyền",
          link: "/list-role",
          parentId: "role",
        },
      ],
    },
    {
      id: "department",
      label: "Quản lý phòng ban",
      icon: "ri-bubble-chart-fill",
      link: "/department",
      stateVariables: isDepartment,
      click: function (e) {
        e.preventDefault();
        setIsDepartment(!isDepartment);
        setIscurrentState("Department");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-department",
          label: "Thêm phòng ban",
          link: "/add-department",
          parentId: "department",
        },
        {
          id: "list-department",
          label: "Danh sách phòng ban",
          link: "/list-department",
          parentId: "department",
        },
      ],
    },
    {
      id: "account",
      label: "Quản lý tài khoản",
      icon: "mdi mdi-account-circle-outline",
      link: "/account",
      stateVariables: isAccount,
      click: function (e) {
        e.preventDefault();
        setIsAccount(!isAccount);
        setIscurrentState("Account");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "add-account",
          label: "Thêm tài khoản",
          link: "/add-account",
          parentId: "account",
        },
        {
          id: "list-account",
          label: "Danh sách tài khoản",
          link: "/list-account",
          parentId: "account",
        },
      ],
    },
    {
      id: "interaction",
      label: "Quản lý tương tác",
      icon: "mdi mdi-account-switch-outline",
      link: "/interaction",
    },
    {
      id: "report",
      label: "Thống kê báo cáo",
      icon: "mdi mdi-chart-areaspline",
      link: "/report",
    },
    {
      id: "setting",
      label: "Thiết lập",
      icon: "mdi mdi-spin mdi-cog-outline fs-22",
      link: "/setting",
    },
    /*{
            label: "pages",
            isHeader: true,
        },*/
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
