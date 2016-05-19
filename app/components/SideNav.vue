<template>
	<ul class="nav">
	 <li class="nav-item">
		 <a class="nav-item-link" v-link="'movieList'">
			 <i class="fa fa-music fa-fw"></i> {{ $t('navigation.all') }}
		 </a>
	 </li>
	 <li class="nav-item">
		 <a class="nav-item-link" v-link="{ name: 'curatedList' }">
			 <i class="fa fa-cogs fa-fw"></i> {{ $t('navigation.curated') }}
		 </a>
	 </li>
	</ul>

	<nav>
		<button type="button" class="btn btn-sm btn-transparent" data-toggle="modal" data-target="#infosModal">
			Infos
		</button>
	</nav>

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
