<template>
	<ul class="nav">
	 <li class="nav-item">
		 <a class="nav-item-link" v-link="{ name: 'showList', params: { type: 'movies' }}">
			 <i class="fa fa-film fa-fw"></i> {{ $t('navigation.movies') }}
		 </a>
	 </li>
	 <li class="nav-item">
		 <a class="nav-item-link" v-link="{ name: 'showList', params: { type: 'tv' }}">
			 <i class="fa fa-tv fa-fw"></i> {{ $t('navigation.tv') }}
		 </a>
	 </li>
	 <li class="nav-item">
		 <!-- <a class="nav-item-link" v-link="{ name: 'curatedList' }">
			 <i class="fa fa-cogs fa-fw"></i> {{ $t('navigation.curated') }}
		 </a> -->
	 </li>
	</ul>

	<button type="button" class="btn btn-sm btn-transparent" data-toggle="modal" data-target="#infosModal">
		dmca
	</button>

	<div id="nav-footer">
		<div class="row">
			<div class="col-xs-4 col-xs-offset-2"><small>v1.1.0</small></div>
		<div>



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
