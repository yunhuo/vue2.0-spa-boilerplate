<template>
	<section class="app-sidebar">
		<img class="logo" src="/static/images/logo.png"/>
		<ul class="sidebar">
			<li>
                <router-link to="/user">
                    <i class="iconfont icon-project"></i>LIST
                </router-link>
			</li>
			<li>
                <router-link to="/widgets">
                    <i class="iconfont icon-pay"></i>Widgets
                </router-link>
			</li>
			<li>
                <router-link to="/login">
                    <i class="iconfont icon-exit"></i>Logout
                </router-link>
			</li>
		</ul>
	</section>
</template>
