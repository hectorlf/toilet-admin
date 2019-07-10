import PostEditor from './PostEditor.svelte';

const app1 = new PostEditor({
    target: document.getElementById("new-post")
});

const app2 = new PostEditor({
    target: document.getElementById("edit-post"),
    props: {
        postId: "1"
    }
});