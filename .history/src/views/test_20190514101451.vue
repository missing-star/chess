<template>
	<div class="content">
		<h2>2 axis scrollbars positioned outside <br />theme: "3d" with buttons</h2>
		<hr />
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
			dolore
			magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo
			consequat.</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			Quis
			autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum
			qui
			dolorem eum fugiat quo voluptas nulla pariatur?</p>
		<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
			repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
			reiciendis
			voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
		<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
			laborum.</p>
		<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
			aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
		</p>
		<p class="half"><img src="images/img1.jpg" /><img src="images/img2.jpg" /></p>
		<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
			numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
			veniam,
			quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
		</p>
		<p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
			illum
			qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
			dolore
			magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo
			consequat.</p>
		<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
			dolores
			eos qui ratione voluptatem sequi nesciunt.</p>
		<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non
			numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
		<p class="half"><img src="images/img5.jpg" /><img src="images/img6.jpg" /></p>
		<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
			aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
		</p>
		<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
		</p>
		<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
			laborum.</p>
		<p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates
			repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut
			reiciendis
			voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
		<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
			laborum.</p>
		<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
			aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
		</p>
		<hr />
		<p>End of content.</p>
	</div>
</template>
<script>
	import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css'
	import $ from 'jquery'
	import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min'
	export default {
		created() {
			
		}
	}
</script>
<style scoped>
div.content{
	height: 200px;
	overflow: auto;
	width: 200px;
}
div.content::-webkit-scrollbar{
	width: 4px;
	height: 0;
}
div.content::-webkit-scrollbar-track{
	background: rgba(204, 204, 204, 0.6);
	border-radius: 4px;
}
div.content::-webkit-scrollbar-thumb{
	background: #fff;
	border-radius: 2px;
}

</style>
