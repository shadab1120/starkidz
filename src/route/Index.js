import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomerProvider } from "../pages/panel/e-commerce/customer/CustomerContext";
import { ProductContextProvider } from "../pages/pre-built/products/ProductContext";
import { UserContextProvider } from "../pages/pre-built/user-manage/UserContext";
import { RedirectAs404 } from "../utils/Utils";
import PageNotFound from "../pages/error/PageNotFound";

import Homepage from "../pages/Homepage";
import AdminPage from "../pages/AdminPage";
import JudegeHomepage from "../pages/JudegeHomepage";
import ClientHomepage from "../pages/ClientHomepage";
import ContentHomepage from "../pages/ContentHomepage";

import Sales from "../pages/Sales";
import Analytics from "../pages/Analytics";

import EcomOrder from "../pages/panel/e-commerce/order/OrderDefault";
import EcomSupport from "../pages/panel/e-commerce/support/Messages";
import EcomProducts from "../pages/panel/e-commerce/product/ProductList";
import EcomCustomer from "../pages/panel/e-commerce/customer/CustomerList";
import EcomCustomerDetails from "../pages/panel/e-commerce/customer/CustomerDetails";
import EcomIntegration from "../pages/panel/e-commerce/integration/Integration";
import EcomSettings from "../pages/panel/e-commerce/settings/Settings";
import EcomDashboard from "../pages/panel/e-commerce/index";

import Component from "../pages/components/Index";
import Accordian from "../pages/components/Accordions";
import Alerts from "../pages/components/Alerts";
import Avatar from "../pages/components/Avatar";
import Badges from "../pages/components/Badges";
import Breadcrumbs from "../pages/components/Breadcrumbs";
import ButtonGroup from "../pages/components/ButtonGroup";
import Buttons from "../pages/components/Buttons";
import Cards from "../pages/components/Cards";
import Carousel from "../pages/components/Carousel";
import Dropdowns from "../pages/components/Dropdowns";
import FormElements from "../pages/components/forms/FormElements";
import FormLayouts from "../pages/components/forms/FormLayouts";
import FormValidation from "../pages/components/forms/FormValidation";
import DataTablePage from "../pages/components/table/DataTable";
import DateTimePicker from "../pages/components/forms/DateTimePicker";
import CardWidgets from "../pages/components/widgets/CardWidgets";
import ChartWidgets from "../pages/components/widgets/ChartWidgets";
import RatingWidgets from "../pages/components/widgets/RatingWidgets";
import SlickPage from "../pages/components/misc/Slick";
import SweetAlertPage from "../pages/components/misc/SweetAlert";
import BeautifulDnd from "../pages/components/misc/BeautifulDnd";
import DualListPage from "../pages/components/misc/DualListbox";
import GoogleMapPage from "../pages/components/misc/GoogleMap";
import Modals from "../pages/components/Modals";
import Pagination from "../pages/components/Pagination";
import Popovers from "../pages/components/Popovers";
import Progress from "../pages/components/Progress";
import Spinner from "../pages/components/Spinner";
import Tabs from "../pages/components/Tabs";
import Toast from "../pages/components/Toast";
import Tooltips from "../pages/components/Tooltips";
import Typography from "../pages/components/Typography";
import CheckboxRadio from "../pages/components/forms/CheckboxRadio";
import AdvancedControls from "../pages/components/forms/AdvancedControls";
import InputGroup from "../pages/components/forms/InputGroup";
import FormUpload from "../pages/components/forms/FormUpload";
import NumberSpinner from "../pages/components/forms/NumberSpinner";
import NouiSlider from "../pages/components/forms/nouislider";
import WizardForm from "../pages/components/forms/WizardForm";
import UtilBorder from "../pages/components/UtilBorder";
import UtilColors from "../pages/components/UtilColors";
import UtilDisplay from "../pages/components/UtilDisplay";
import UtilEmbeded from "../pages/components/UtilEmbeded";
import UtilFlex from "../pages/components/UtilFlex";
import UtilOthers from "../pages/components/UtilOthers";
import UtilSizing from "../pages/components/UtilSizing";
import UtilSpacing from "../pages/components/UtilSpacing";
import UtilText from "../pages/components/UtilText";

import Blank from "../pages/others/Blank";
import Faq from "../pages/others/Faq";
import Regularv1 from "../pages/others/Regular-1";
import Regularv2 from "../pages/others/Regular-2";
import Terms from "../pages/others/Terms";
import BasicTable from "../pages/components/table/BasicTable";
import SpecialTablePage from "../pages/components/table/SpecialTable";
import ChartPage from "../pages/components/charts/Charts";
import EmailTemplate from "../pages/components/email-template/Email";
import NioIconPage from "../pages/components/crafted-icons/NioIcon";
import SVGIconPage from "../pages/components/crafted-icons/SvgIcons";

import ProjectCardPage from "../pages/pre-built/projects/ProjectCard";
import ProjectListPage from "../pages/pre-built/projects/ProjectList";
import UserListDefaultPage from "../pages/pre-built/user-manage/UserListDefault";
import UserListRegularPage from "../pages/pre-built/user-manage/UserListRegular";
import UserContactCardPage from "../pages/pre-built/user-manage/UserContactCard";
import UserDetailsPage from "../pages/pre-built/user-manage/UserDetailsRegular";
import UserListCompact from "../pages/pre-built/user-manage/UserListCompact";
import UserProfileLayout from "../pages/pre-built/user-manage/UserProfileLayout";
import OrderDefault from "../pages/pre-built/orders/OrderDefault";
import OrderRegular from "../pages/pre-built/orders/OrderRegular";
import OrderSales from "../pages/pre-built/orders/OrderSales";
import KycListRegular from "../pages/pre-built/kyc-list-regular/KycListRegular";
import KycDetailsRegular from "../pages/pre-built/kyc-list-regular/kycDetailsRegular";
import ProductCard from "../pages/pre-built/products/ProductCard";
import ProductList from "../pages/pre-built/products/ProductList";
import ProductDetails from "../pages/pre-built/products/ProductDetails";
import InvoiceList from "../pages/pre-built/invoice/InvoiceList";
import InvoiceDetails from "../pages/pre-built/invoice/InvoiceDetails";
import PricingTable from "../pages/pre-built/pricing-table/PricingTable";
import PricingTableList from "../pages/pre-built/pricing-table/PricingTableList";
import GalleryPreview from "../pages/pre-built/gallery/GalleryCardPreview";
import JudgeGalleryPreview from "../pages/pre-built/gallery/JudgeGalleryPreview";
import ReactToastify from "../pages/components/misc/ReactToastify";

import AppMessages from "../pages/app/messages/Messages";
import Chat from "../pages/app/chat/ChatContainer";
import Kanban from "../pages/app/kanban/Kanban";
import FileManager from "../pages/app/file-manager/FileManager";
import Inbox from "../pages/app/inbox/Inbox";
import Calender from "../pages/app/calender/Calender";
import JsTreePreview from "../pages/components/misc/JsTree";
import QuillPreview from "../pages/components/forms/rich-editor/QuillPreview";
import TinymcePreview from "../pages/components/forms/rich-editor/TinymcePreview";
import KnobPreview from "../pages/components/charts/KnobPreview";
import { FileManagerContextProvider } from "../pages/app/file-manager/FileManagerContext";
import UserPage from "../pages/UserPage/UserPage";
import StarBucks from "../pages/StarBuck/StarBucks";
import SchoolCenter from "../pages/SchoolCenter/SchoolCenter";
import help from "../pages/help/help";
import BuyStarBucks from "../pages/StarBuck/BuyStarBucks";
import MoreBuyStarBucks from "../pages/StarBuck/MoreBuyStarBucks";
import Judging from "../pages/Judging/Judging";
import NewGallery from "../pages/New Gallery/NewGallery";
import CreateContest from "../pages/CreateContest";
import Participate from "../pages/participate/Participate";
import Downloads from "../pages/downloads/Downloads";
import OldContest from "../pages/oldcontest/oldcontest";
import CurrentContest from "../pages/CurrentContest/CurrentContest";

import JudegeEntries from "../pages/JudegeEntries/JudegeEntries";
import MonitorContest from "../pages/MonitorContest/MonitorContest";
import ViewContest from "../pages/MonitorContest/ViewContest";
import ManageContestant from "../pages/MonitorContest/ManageContestant";
import VerifyContestant from "../pages/MonitorContest/VerifyContestant";
import AskForMoreWork from "../pages/MonitorContest/AskForMoreWork";
import VerifyAge from "../pages/MonitorContest/VerifyAge";
import CloseContest from "../pages/CloseContest/CloseContest";
import ResultAnnouncement from "../pages/ResultAnnouncement/ResultAnnouncement";
import LeaveManagement from "../pages/LeaveManagement/LeaveManagement";

import RoleList from "../pages/RoleList/RoleList";
import DistrictList from "../pages/District/DistrictList";
import PrizeList from "../pages/prizes/PrizeList";
import RejectionList from "../pages/RejectionReason/RejectionList";

import CatestCategories from "../pages/CatestCategories/CatestCategories";
import JudgingParameters from "../pages/JudgingParameters/JudgingParameters";
import Regions from "../pages/Regions/Regions";
import AddRegion from "../pages/Regions/AddRegions";
import States from "../pages/States/States";
import AddState from "../pages/States/AddStates";
import Cities from "../pages/Cities/Cities";
import AddCity from "../pages/Cities/AddCity";
import Brackets from "../pages/Brackets/Brackets";
import AddAgeBracket from "../pages/Brackets/AddAgeBracket";
import ContentTypes from "../pages/ContentTypes/ContentTypes";
import RegistrationsReport from "../pages/ContentTypes/RegistrationsReport";
import ContentEntries from "../pages/ContentTypes/ContentEntries";
import LoginReports from "../pages/ContentTypes/LoginReports";

import UserList from "../pages/UserList/UserList";
import AddUser from "../pages/UserList/AddUser";
import ChildrenEnrollment from "../pages/ChildrenEnrollment/ChildrenEnrollment";
import ClassMaster from "../pages/ClassMaster/ClassMaster";
import SectionMaster from "../pages/SectionMaster/SectionMaster";
import HouseMaster from "../pages/HouseMaster/HouseMaster";
import StramMaster from "../pages/StramMaster/StramMaster";
import ChangePassword from "../pages/auth/changePassword";
import CreateContestNew from "../pages/CreateContestNew";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/* contest */}
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/create-contest`, `${process.env.PUBLIC_URL}/create-contest/:id`]}
          component={CreateContestNew}
        ></Route>
        <Route exact path={[`${process.env.PUBLIC_URL}/create-contest-new`]} component={CreateContestNew}></Route>
        <Route exact path={[`${process.env.PUBLIC_URL}/create-contest`]} component={CreateContest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/participate`} component={Participate}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/downloads`} component={Downloads}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/old-contests`} component={OldContest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/current-contests`} component={CurrentContest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/roles`} component={RoleList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/district`} component={DistrictList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/prizes`} component={PrizeList}></Route>

        <Route exact path={`${process.env.PUBLIC_URL}/users`} component={UserList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/add-users`} component={AddUser}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/children_enrollments`} component={ChildrenEnrollment}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/class_master`} component={ClassMaster}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/section_master`} component={SectionMaster}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/house_master`} component={HouseMaster}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/stream_master`} component={StramMaster}></Route>

        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/contest_categories`, `${process.env.PUBLIC_URL}/contest_categories/:id`]}
          component={CatestCategories}
        ></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/judging_parameters`, `${process.env.PUBLIC_URL}/judging_parameters/:id`]}
          component={JudgingParameters}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/regions`} component={Regions}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/add-region`, `${process.env.PUBLIC_URL}/add-region/:id`]}
          component={AddRegion}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/states`} component={States}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/add-state`, `${process.env.PUBLIC_URL}/add-state/:id`]}
          component={AddState}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/cities`} component={Cities}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/add-city`, `${process.env.PUBLIC_URL}/add-city/:id`]}
          component={AddCity}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/brackets`} component={Brackets}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/add-age-bracket`, `${process.env.PUBLIC_URL}/add-age-bracket/:id`]}
          component={AddAgeBracket}
        ></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/content_types`, `${process.env.PUBLIC_URL}/content_types/:id`]}
          component={ContentTypes}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/registration_report`} component={RegistrationsReport}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/contest_entries`} component={ContentEntries}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/login_reports`} component={LoginReports}></Route>

        {/*Panel */}
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/index`} component={EcomDashboard}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/orders`} component={EcomOrder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/products`} component={EcomProducts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/support`} component={EcomSupport}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer`}
          render={() => (
            <CustomerProvider>
              <EcomCustomer />
            </CustomerProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/ecommerce/customer-details/:id`}
          render={(props) => (
            <CustomerProvider>
              <EcomCustomerDetails {...props} />
            </CustomerProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/settings`} component={EcomSettings}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ecommerce/integration`} component={EcomIntegration}></Route>

        {/*Dashboards*/}
        <Route exact path={`${process.env.PUBLIC_URL}/sales`} component={Sales}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/analytics`} component={Analytics}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/_blank`} component={Blank}></Route>

        {/* pages */}
        <Route exact path={`${process.env.PUBLIC_URL}/userPage`} component={UserPage}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/starbucks`, `${process.env.PUBLIC_URL}/starbucks/:id`]}
          component={StarBucks}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/help`} component={help}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/buy_starbucks`} component={BuyStarBucks}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/more_buy_starbucks`} component={MoreBuyStarBucks}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/profile`} component={UserPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/judging`} component={Judging}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/rejection_reason`} component={RejectionList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/school_center`} component={SchoolCenter}></Route>
        <Route
          exact
          path={[`${process.env.PUBLIC_URL}/judge_entries`, `${process.env.PUBLIC_URL}/judge_entries/:Id`]}
          component={JudegeEntries}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/monitor-contest`} component={MonitorContest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/verify-age`} component={VerifyAge}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/verify-contest`} component={VerifyContestant}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/ask_for_more_work`} component={AskForMoreWork}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/manage-contestant`} component={ManageContestant}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/view-contest`} component={ViewContest}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/close-contest`} component={CloseContest}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/result-preparation-and-announcement`}
          component={ResultAnnouncement}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/leave-management`} component={LeaveManagement}></Route>

        {/*Pre-built Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/project-card`} component={ProjectCardPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/project-list`} component={ProjectListPage}></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-list-regular`}
          render={() => (
            <UserContextProvider>
              <UserListRegularPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-list-default`}
          render={() => (
            <UserContextProvider>
              <UserListDefaultPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-list-compact`}
          render={() => (
            <UserContextProvider>
              <UserListCompact />
            </UserContextProvider>
          )}
        ></Route>
        <Route //Context Api added
          exact
          path={`${process.env.PUBLIC_URL}/user-details-regular/:id`}
          render={(props) => (
            <UserContextProvider>
              <UserDetailsPage {...props} />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-regular/`} component={UserProfileLayout}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/user-profile-notification/`}
          component={UserProfileLayout}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-activity/`} component={UserProfileLayout}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user-profile-setting/`} component={UserProfileLayout}></Route>
        <Route //Context api added
          exact
          path={`${process.env.PUBLIC_URL}/user-contact-card`}
          render={() => (
            <UserContextProvider>
              <UserContactCardPage />
            </UserContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-default`} component={OrderDefault}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-regular`} component={OrderRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/order-list-sales`} component={OrderSales}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/kyc-list-regular`} component={KycListRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/kyc-details-regular/:id`} component={KycDetailsRegular}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/product-list`} component={ProductList}></Route>

        <Route // context api added
          exact
          path={`${process.env.PUBLIC_URL}/product-card`}
          render={(props) => (
            <ProductContextProvider>
              <ProductCard />
            </ProductContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/product-details/:id`}
          render={(props) => (
            <ProductContextProvider>
              <ProductDetails {...props} />
            </ProductContextProvider>
          )}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invoice-list`} component={InvoiceList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/invoice-details/:id`} component={InvoiceDetails}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pricing-table`} component={PricingTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pricing`} component={PricingTableList}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/gallery`} component={GalleryPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/judge_gallery`} component={JudgeGalleryPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/newGallery`} component={NewGallery}></Route>

        {/*Demo Pages*/}
        <Route exact path={`${process.env.PUBLIC_URL}/pages/terms-policy`} component={Terms}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/faq`} component={Faq}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/regular-v1`} component={Regularv1}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/pages/regular-v2`} component={Regularv2}></Route>

        {/*Application*/}
        <Route exact path={`${process.env.PUBLIC_URL}/app-messages`} component={AppMessages}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-chat`} component={Chat}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-calender`} component={Calender}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-kanban`} component={Kanban}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/app-inbox`} component={Inbox}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/files`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/shared`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/starred`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/recovery`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/settings`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/pricing`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/app-file-manager/folder/:id`}
          render={(props) => (
            <FileManagerContextProvider>
              <FileManager />
            </FileManagerContextProvider>
          )}
        ></Route>

        {/*Components*/}
        <Route exact path={`${process.env.PUBLIC_URL}/components`} component={Component}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/accordions`} component={Accordian}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/alerts`} component={Alerts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/avatar`} component={Avatar}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/badges`} component={Badges}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/breadcrumbs`} component={Breadcrumbs}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/button-group`} component={ButtonGroup}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/buttons`} component={Buttons}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/cards`} component={Cards}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/carousel`} component={Carousel}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/dropdowns`} component={Dropdowns}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/datetime-picker`} component={DateTimePicker}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-elements`} component={FormElements}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-layouts`} component={FormLayouts}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/checkbox-radio`} component={CheckboxRadio}></Route>
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/components/advanced-control`}
          component={AdvancedControls}
        ></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/input-group`} component={InputGroup}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-upload`} component={FormUpload}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/number-spinner`} component={NumberSpinner}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/form-validation`} component={FormValidation}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/modals`} component={Modals}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/pagination`} component={Pagination}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/popovers`} component={Popovers}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/progress`} component={Progress}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/spinner`} component={Spinner}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tabs`} component={Tabs}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/toast`} component={Toast}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tooltips`} component={Tooltips}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/typography`} component={Typography}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/noUislider`} component={NouiSlider}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/wizard-basic`} component={WizardForm}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/quill`} component={QuillPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/tinymce`} component={TinymcePreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/cards`} component={CardWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/charts`} component={ChartWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/widgets/rating`} component={RatingWidgets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/slick-slider`} component={SlickPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/sweet-alert`} component={SweetAlertPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/beautiful-dnd`} component={BeautifulDnd}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/map`} component={GoogleMapPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/dual-list`} component={DualListPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/toastify`} component={ReactToastify}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/misc/jsTree`} component={JsTreePreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-border`} component={UtilBorder}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-colors`} component={UtilColors}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-display`} component={UtilDisplay}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-embeded`} component={UtilEmbeded}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-flex`} component={UtilFlex}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-others`} component={UtilOthers}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-sizing`} component={UtilSizing}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-spacing`} component={UtilSpacing}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/components/util-text`} component={UtilText}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-basic`} component={BasicTable}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-datatable`} component={DataTablePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/table-special`} component={SpecialTablePage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/charts/chartjs`} component={ChartPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/charts/knobs`} component={KnobPreview}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/email-template`} component={EmailTemplate}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/nioicon`} component={NioIconPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/svg-icons`} component={SVGIconPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/content_dashboard`} component={ContentHomepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/judge_dashboard`} component={JudegeHomepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/client_dashboard`} component={ClientHomepage}></Route>
        {/* <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Homepage}></Route> */}
        {/*  <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={UserPage}></Route>*/}
        <Route exact path={`${process.env.PUBLIC_URL}/dashboard`} component={Homepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/admin_dashboard`} component={AdminPage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/changePassword`} component={ChangePassword}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
