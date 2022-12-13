/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer
    .define('video:deleteComment', async (user, comment) => {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return user.id === comment.user.id || permissions?.some((permission) => permission.name === 'video:deleteComment') || roles[0]?.permissions?.some((permission) => permission === 'video:deleteComment')
    })
    .define('pub:create', async (user) => {
        const permissions = await user.related('permissions').query()
        const roles = await user.related('roles').query()

        return permissions?.some((permission) => permission.name === 'pub:create') || roles[0]?.permissions?.some((permission) => permission === 'pub:create')
    })


/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({
    PermissionPolicy: () => import('App/Policies/PermissionPolicy'),
    RolesPolicy: () => import('App/Policies/RolesPolicy'),
    VideosPolicy: () => import('App/Policies/VideosPolicy'),
    PubPolicy: () => import('App/Policies/PubPolicy'),
})


