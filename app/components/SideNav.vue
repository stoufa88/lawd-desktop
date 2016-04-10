<template>
	<ul class="nav">
	 <li class="nav-item">
		 <a class="nav-item-link" v-link="'movieList'">
			 <i class="fa fa-music fa-fw"></i> All
		 </a>
	 </li>
	 <li class="nav-item">
		 <a class="nav-item-link" href="/staff_picks">
			 <i class="fa fa-cogs fa-fw"></i> Staff picks
		 </a>
	 </li>
	</ul>
</template>

<script>
export default {
	methods: {

  },
	data () {
		return {
			sort: 'Latest'
		}
	}
}
</script>
