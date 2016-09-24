import { MainContainer, AuthContainer } from "./containers";
import { AccountList, AccountCreateForm } from "./ui";
import { AuthGuard } from "./service/user"

export const routes = [
    {
        path: "",
        component: MainContainer,
        canActivate: [ AuthGuard ],
        children: [
            { path: "", component: AccountList },
            { path: "create-account", component: AccountCreateForm }
        ]

    },
    {
        path: "auth",
        component: AuthContainer
    },
    { path: "**", redirectTo: "" }
];
