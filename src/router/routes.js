const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Todo.vue") },
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
