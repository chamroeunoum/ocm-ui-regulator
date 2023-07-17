import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './plugins/authentication'
import LoginComponent from './layouts/login/index.vue'
import ForgotPasswordComponent from './layouts/login/forgot_password.vue'
import ForgotPasswordConfirmationComponent from './layouts/login/forgot_password_confirmation.vue'
import PasswordUpdateComponent from './layouts/login/password_update.vue'
import PasswordChangeComponent from './components/user/password_change.vue'
import RegisterComponent from './layouts/login/register.vue'
import RegisterConfirmationComponent from './layouts/login/register_confirmation.vue'
import WelcomeComponent from './layouts/welcome/index.vue'
import UserComponent from './components/user/index.vue'
import UserProfileComponent from './components/user/profile.vue'
import DashboardComponent from './layouts/dashboard/index.vue'
/**
 * Folder Section
 */
import FolderComponent from './components/folder/index.vue'
import FolderListComponent from './components/folder/list.vue'
import FolderDetailComponent from './components/folder/detail.vue'
import FolderRegulatorComponent from './components/folder/regulator.vue'

import RegulatorComponent from './components/regulator/index.vue'
import RegulatorListComponent from './components/regulator/list.vue'
import GlobalSharedRegulatorComponent from './components/regulator/globalshare/index.vue'
/**
 * Error
 */
import Page404 from './components/errors/404.vue'
let routes = [] 
routes = [{ 
        path: '', 
        redirect: to => {
            return '/welcome'
        }
    },
    { 
        path: '/', 
        redirect: to => {
            return '/welcome'
        }
    },
    {
        name: 'Welcome',
        path: '/welcome',
        component: WelcomeComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Login',
        path: '/login',
        component: LoginComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordForgot',
        path: '/password/forgot',
        component: ForgotPasswordComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordForgotConfirmation',
        path: '/password/forgot/confirmation',
        component: ForgotPasswordConfirmationComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'PasswordUpdate',
        path: '/password/reset',
        component: PasswordUpdateComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Register',
        path: '/register',
        component: RegisterComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'RegisterConfirmation',
        path: '/register/confirmation',
        component: RegisterConfirmationComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    /**
     * Authenticated routes
     */
     {
        name: 'Dashboard',
        path: '/dashboard',
        component: DashboardComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: "UserProfile" ,
        path: '/profile' ,
        component: UserProfileComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: "UserPasswordChange" ,
        path: '/password/change' ,
        component: PasswordChangeComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'Folder' ,
        path: '/folders',
        component: FolderComponent ,
        meta: { 
            transition: 'slide-right' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [
            {
                name: "FolderList" ,
                path: '' ,
                component: FolderListComponent
            },
            {
                name: "FolderDetail" ,
                path: ':id/detail' ,
                component: FolderDetailComponent
            },
            {
                name: "FolderRegulators" ,
                path: ':id/regulators' ,
                component: FolderRegulatorComponent
            },
        ]
    },
    {
        name: 'Regulator' ,
        path: '/regulators',
        component: RegulatorComponent ,
        meta: { 
            transition: 'slide-right' ,
            requiresAuth: true,
            is_admin : true
        },
        children: [
            {
                name: "RegulatorList" ,
                path: '' ,
                component: RegulatorListComponent
            }
        ]
    },
    {
        name: "GlobalSharedRegulator" ,
        path: '/globalshare/:serial' ,
        component: GlobalSharedRegulatorComponent ,
        meta: { 
            transition: 'slide-right' ,
            requiresAuth: false,
            is_admin : false
        },
    },
    ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// Meta Handling
// router.beforeEach((to, from, next) => {
//     if ( !isAuth() ){
//         next({ path: '/' })
//     }else if(isAuth()){
//         next()
//     }
//     return false
// })

// Meta Handling
// router.beforeEach((to, from, next) => {})
// .beforeResolve(async to => {
//     if (to.meta.requiresCamera) {
//         try {
//         await askForCameraPermission()
//         } catch (error) {
//         if (error instanceof NotAllowedError) {
//             // ... handle the error and then cancel the navigation
//             return false
//         } else {
//             // unexpected error, cancel the navigation and pass the error to the global handler
//             throw error
//         }
//         }
//     }
// })

export default router