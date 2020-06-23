<template>
    <div>
        <div class="d-flex">
            <h2 class="mb-3">Список постов (всего: {{ pagination.total_posts }})</h2>
            <div v-if="loading" class="spinner-border text-primary ml-2"></div>
        </div>

        <div v-if="errored" class="alert alert-dark" role="alert">
            списка нету!
        </div>

        <table v-else class="table">
            <thead>
            <tr class="text-primary text-center">
                <th scope="col">ID</th>
                <th scope="col">Название</th>
                <th scope="col">Описание</th>
                <th scope="col">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination pagination m-0">
                            <li :class="{ disabled: !pagination.prev_page_url}" disabled
                                @click.prevent="getPosts(pagination.prev_page_url)"
                                class="page-item">
                                <a class="page-link font-weight-bolder" href="#" aria-label="Previous">
                                    <span aria-hidden="true"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>
                                </a>
                            </li>
                            <li class="page-item"><a class="page-link"><strong>{{ pagination.current_page
                                }}</strong></a></li>
                            <li @click.prevent="getPosts(pagination.next_page_url)"
                                class="page-item">
                                <a class="page-link font-weight-bolder" href="#" aria-label="Next">
                                    <span aria-hidden="true"><i class="fa fa-arrow-right" aria-hidden="true"></i></span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in posts">
                <th scope="row">{{ post.id }}</th>
                <th scope="row">{{ post.title }}</th>
                <th scope="row">{{ post.desc }}</th>
                <td>
                    <div class="d-inline-flex justify-content-between">
                        <button @click="editPost(post)" class="btn btn-outline-success mr-1">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        <button @click="delPost(post.id)" class="btn btn-outline-danger">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <form @submit.prevent="addPost" class="mb-5 p-3 shadow rounded">
            <div class="form-group">
                <label for="title2">Название</label>
                <input v-model="post.title" type="text" class="form-control" id="title2" name="title">
            </div>
            <div class="form-group">
                <label for="desc2">Описание</label>
                <textarea v-model="post.desc" class="form-control" id="desc2" name="desc" rows="4"></textarea>
            </div>
            <button v-if="edit" type="submit" class="btn btn-primary">изменить пост</button>
            <button v-else type="submit" class="btn btn-primary">добавить пост</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                posts: [],
                postCount: '',
                post: {
                    id: '',
                    title: '',
                    desc: ''
                },
                pagination: {},
                edit: false,
                loading: false,
                errored: false
            }
        },
        mounted() {
            this.getPosts()
        },
        methods: {
            getPosts(page) {
                page = page || '/api/post'
                this.loading = true
                axios
                    .get(page)
                    .then(response => {
                        this.posts = response.data.data
                        this.makePagination(response.data)
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                    })
                    .finally(() => this.loading = false)
            },
            makePagination(responseData) {
                this.pagination = {
                    current_page: responseData.current_page,
                    last_page: responseData.last_page,
                    prev_page_url: responseData.prev_page_url,
                    next_page_url: responseData.next_page_url,
                    total_posts: responseData.total
                };
            },
            addPost() {
                if (!this.edit) {
                    axios
                        .post('/api/post', {
                            title: this.post.title,
                            desc: this.post.desc
                        })
                        .then(response => {
                            this.post.title = ''
                            this.post.desc = ''
                            this.getPosts()

                            console.log(response)
                        })
                        .catch(error => console.log(error))
                } else {
                    axios
                        .put(`/api/post/${this.post.id}`, {
                            title: this.post.title,
                            desc: this.post.desc
                        })
                        .then(response => {
                            this.post.title = ''
                            this.post.desc = ''
                            this.edit = false
                            this.getPosts()

                            console.log(response)
                        })
                        .catch(error => console.log(error))
                }
            },
            editPost(post) {
                this.edit = true
                this.post.id = post.id
                this.post.title = post.title
                this.post.desc = post.desc
            },
            delPost(id) {
                axios
                    .delete(`/api/post/${id}`)
                    .then(response => console.log(response))
                    .catch(error => console.log(error))

                this.getPosts()
            }
        }
    }
</script>

<style scoped>
    button {

    }
</style>
