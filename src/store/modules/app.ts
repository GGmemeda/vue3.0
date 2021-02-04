interface StateProps{
  accessToken: string,
  username: string,
  avatar: string,
}
interface acceptProps{
  commit:Function,
  state:StateProps
}

const state:StateProps = {
  accessToken: 'sdsadasdasdasdasdsadasdasd',
  username: '',
  avatar: '',
}
const getters = {}
const actions = {
  LOOK_VUX_ACTION({commit}:acceptProps) {
    console.log('action');
    commit('CHANGE_DATA', '111');
  }
}
const mutations = {
  CHANGE_DATA(state:StateProps, data:any) {
    console.log('mutation');
    state.username = data;
  }

}
export default {state, getters, mutations, actions}