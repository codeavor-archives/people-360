import _ from 'lodash'

export default async ({ Vue }) => {
    Vue.prototype.$lodash = _
}