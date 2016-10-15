<template>
	<div class="order-view">
		<div class="toolbar">
            <div class="button button-blue sm-button" @click="onSearch">Search</div>
        </div>
		<infinite ref="infinite" url="/static/assets/list.json" :on-load-success="onLoadSuccess" :on-load-failure="onLoadFailure">
			<table slot="content" class="orders" cellspacing="0" cellpadding="0">
				<thead>
					<tr>
						<th width="250px">openid</th>
						<th>nickname</th>
						<th width="140px">credit</th>
						<th width="140px">time</th>
                        <th width="140px">operation</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in items" track-by="_id">
						<td>{{ item._id }}</td>
						<td>{{ item.title }}</td>
						<td>{{ item.amount }}</td>
						<td>{{ item.createdAt }}</td>
                        <td><span :style="{ color: '#2c9fff', cursor: 'pointer' }" @click="onClickCredit(item._id)">Change</span></td>
					</tr>
				</tbody>
			</table>
		</infinite>

        <search ref="search" title="Search"></search>
        <credit-modal ref="creditModal" title="Change Credit" :on-change-credit="onChangeCredit"></credit-modal>
	</div>
</template>

<script type="text/ecmascript-6">
    import { mapState } from 'vuex';
	import { root, user } from '../store/types';
	import Infinite from './widgets/Infinite.vue';
    import Search from './widgets/Search.vue';
    import CreditModal from './modals/CreditModal.vue';

	export default {
		components: {
			Infinite,
            Search,
            CreditModal
		},

		mounted() {
			this.$refs.infinite.refresh();
		},

		beforeDestroy() {
            this.$store.commit(root.RESET);
		},

        computed: {
            ...mapState({
                error: ({ user }) => user.error,
                items: ({ user }) => user.items
            })
        },

		watch: {
			error(v) {
				if(v) {
					window.$refs.toast.error(v.message);
				}
			}
		},

		methods: {
			onLoadSuccess(data) {
                this.$store.commit(user.LIST_LOADED, data);
			},
			onLoadFailure(data) {
                this.$store.commit(user.LIST_ERROR, data);
			},

            onSearch() {
                const self = this;
                this.$refs.search.show({
                    items: [{
                        name: 'nickname',
                        type: 'text',
                        label: 'Nick Name'
                    }],

                    callback(obj) {
                        self.$refs.infinite.filter(obj);
                    }
                });
            },

            onClickCredit(id) {
                this.$refs.creditModal.show(id);
            },

            onChangeCredit(obj) {
                this.$store.dispatch(user.CHANGE_CREDIT, obj);
            }
		}
	};
</script>
