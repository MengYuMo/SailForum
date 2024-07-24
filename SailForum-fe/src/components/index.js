import SMenu from "./SMenu/SMenu.vue";

const componentList = [
	{
		name: "SMenu",
		component: SMenu,
	}
]

export default {
	install(Vue) {
		componentList.forEach(component => {
			Vue.component(component.name, component.component)
		})
	}
}
