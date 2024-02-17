import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './authentication'

import LoginComponent from './../layouts/login/index.vue'
import ForgotPasswordComponent from './../layouts/login/forgot_password.vue'
import ForgotPasswordConfirmationComponent from './../layouts/login/forgot_password_confirmation.vue'
import PasswordUpdateComponent from './../layouts/login/password_update.vue'
import PasswordChangeComponent from './../components/user/password_change.vue'
import RegisterComponent from './../layouts/login/register.vue'
import RegisterConfirmationComponent from './../layouts/login/register_confirmation.vue'
import GlobalSearchComponent from './../layouts/welcome/global.vue'
import MainPageComponent from './../layouts/welcome/index.vue'
import GlobalFolderComponent from './../layouts/welcome/folder.vue'
import UserComponent from './../components/user/index.vue'
import UserProfileComponent from './../components/user/profile.vue'
import DashboardComponent from './../layouts/dashboard/index.vue'
/**
 * Folder Section
 */
import FolderComponent from './../components/folder/index.vue'
import FolderListComponent from './../components/folder/thumb.vue'
import FolderDetailComponent from './../components/folder/detail.vue'
import FolderRegulatorComponent from './../components/folder/regulator.vue'

import RegulatorComponent from './../components/regulator/index.vue'
import RegulatorListComponent from './../components/regulator/list.vue'
import GlobalSharedRegulatorComponent from './../components/regulator/globalshare/index.vue'
/**
 * Attendant
 */
import AttendantComponent from './../components/attendant/index.vue'
import AttendantListComponent from './../components/attendant/list.vue'
/**
 * Task
 */
import TaskComponent from './../components/task/index.vue'
import TaskListComponent from './../components/task/list.vue'
/**
 * Error
 */
import Page404 from './../components/errors/404.vue'

export const getRoutes = () => {
  if( isAuth() ){
    return [
    { 
        path: '', 
        name: "EmptyURI" ,
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        name: "RootURI" ,
        redirect: to => {
            return '/login'
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
        name: 'Welcome',
        path: '/welcome',
        component: MainPageComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    // {
    // name: 'Attendant',
    // path: '/attendants',
    // component: AttendantComponent ,
    //     meta: { 
    //         transition: 'slide-right' ,
    //         requiresAuth: true,
    //         is_admin : true
    //     },
    //     children: [
    //         {
    //             name: "AttendantList" ,
    //             path: '' ,
    //             component: AttendantListComponent
    //         }
    //     ]
    // },
    {
        name: 'Task',
        path: '/tasks',
        component: TaskComponent ,
            meta: { 
                transition: 'slide-right' ,
                requiresAuth: true,
                is_admin : true
            },
            children: [
                {
                    name: "TaskList" ,
                    path: '' ,
                    component: TaskListComponent
                }
            ]
        },
    {
        name: 'GlobalSearch',
        path: '/search',
        component: GlobalSearchComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'GlobalFolder',
        path: '/global/:folder_id/regulators',
        component: GlobalFolderComponent ,
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
    //   {
    //       name: 'Regulator' ,
    //       path: '/regulators',
    //       component: RegulatorComponent ,
    //       meta: { 
    //           transition: 'slide-right' ,
    //           requiresAuth: true,
    //           is_admin : true
    //       },
    //       children: [
    //           {
    //               name: "RegulatorList" ,
    //               path: '' ,
    //               component: RegulatorListComponent
    //           }
    //       ]
    //   },
      {
          name: "GlobalSharedRegulator" ,
          path: '/globalshare/:serial' ,
          component: GlobalSharedRegulatorComponent ,
          meta: { 
              transition: 'slide-right' ,
              requiresAuth: false,
              is_admin : false
          }
      },
      // will match everything and put it under `$route.params.pathMatch`
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
  }
  return [
    /**
     * Unauthenticated routes
     */
    { 
        path: '', 
        name: "EmptyURI" ,
        redirect: to => {
            return '/login'
        }
    },
    { 
        path: '/', 
        name: "RootURI" ,
        redirect: to => {
            return '/login'
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
        name: 'Welcome',
        path: '/welcome',
        component: MainPageComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    {
        name: 'GlobalSearch',
        path: '/search',
        component: GlobalSearchComponent ,
        meta: {
            // transition: 'fade'
        }
    },
    // {
    //     name: 'GlobalFolder',
    //     path: '/global/:folder_id/regulators',
    //     component: GlobalFolderComponent ,
    //     meta: {
    //         // transition: 'fade'
    //     }
    // },
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
    // will match everything and put it under `$route.params.pathMatch`
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
  ]
}