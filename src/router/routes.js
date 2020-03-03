const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Todo.vue") },
      // { path: "", component: () => import("pages/PageReservation.vue") },
      { path: "settings", component: () => import("pages/Settings.vue") },
      { path: "settings/help", component: () => import("pages/PageHelp.vue") },
      {
        path: "settings/profile",
        component: () => import("pages/PageProfile.vue")
      },
      { path: "auth", component: () => import("pages/PageAuth.vue") },
      { path: "chat/:id", component: () => import("pages/PageChat.vue") },
      { path: "contacts", component: () => import("pages/PageContact.vue") },
      { path: "users", component: () => import("pages/PageUsers.vue") },
      { path: "services", component: () => import("pages/PageServices.vue") },
      {
        path: "schedules",
        component: () => import("pages/PageInspectorSchedule.vue")
      },
      { path: "checkout", component: () => import("pages/PageCheckout.vue") },
      {
        path: "approved-projects",
        component: () => import("pages/PageApprovedPreProposal.vue")
      },
      {
        path: "pending-projects",
        component: () => import("pages/PagePendingPreProposal.vue")
      },
      {
        path: "list-services",
        component: () => import("pages/PageServicesList.vue")
      },
      {
        path: "inspectors",
        component: () => import("pages/PageInspector.vue")
      },
      {
        path: "positions",
        component: () => import("pages/PagePosition.vue")
      },
      {
        path: "reservation",
        component: () => import("pages/PageReservation.vue")
      },
      {
        path: "equipment-category",
        component: () => import("pages/PageEquipmentCategory.vue")
      },
      {
        path: "certificates",
        component: () => import("pages/PageCertificates.vue")
      },
      {
        path: "print-certificates",
        component: () => import("pages/PagePrintCertificates.vue")
      },
      {
        path: "mobilization",
        component: () => import("pages/PageMobilization.vue")
      },
      {
        path: "safety-associate",
        component: () => import("pages/PageSafetyAssociate.vue")
      },
      {
        path: "formal-quotation",
        component: () => import("pages/PageQuotation.vue")
      },
      {
        path: "special-skills",
        component: () => import("pages/PageSpecialSkill.vue")
      },
      {
        path: "certificate-builder",
        component: () => import("pages/PageCertificateBuilder.vue")
      },
      {
        path: "scheduling",
        component: () => import("pages/PageScheduling.vue")
      },
      {
        path: "checklists",
        component: () => import("pages/PageChecklist.vue")
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
