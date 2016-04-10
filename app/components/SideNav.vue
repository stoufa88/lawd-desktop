<template>
	<ul class="nav">
	 <li class="nav-item">
		 <Link class="nav-item-link" to="/all">
			 <i class="fa fa-music fa-fw"></i> All
		 </Link>
	 </li>
	 <li class="nav-item">
		 <Link class="nav-item-link" to="/staff_picks">
			 <i class="fa fa-cogs fa-fw"></i> Staff picks
		 </Link>
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
