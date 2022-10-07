<script>
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import { db } from "./firebase";
  import 'bootswatch/dist/slate/bootstrap.min.css';

  let task = {
    title: "",
    description: "",
  };
  let status = false;
  let currentId ='';
  let listTask = [];

  const AddTask = async () => {
    await addDoc(collection(db, "tasks"), task);
  };

  const handleSubmit = async () => {
    try {
      if (status) {
        updateTask();
        return;
      }
      if(task.title==="" || task.description===""){
        alert('Campos Vacios!')
        return
      }
      AddTask();
      clear();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      clear();
    } catch (error) {
      console.log(error);
    }
  };

  const fillTask = (dataTask) => {
    task.title = dataTask.title;
    task.description = dataTask.description;
    status = true;
    currentId=dataTask.id
  };

  const updateTask = async()=>{
    try {
      if(status){
        await updateDoc(doc(db,"tasks",currentId),task)
        clear();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const usub = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
    (listTask = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    })),
      (error) => {
        console.log(error);
      };
  });

  onDestroy(usub);

  const clear = () => {
    task = {
      title: "",
      description: "",
    };
  };
</script>

<div class="container pt-5">
  <div class="row">
    <div class="col-md-6">
      <form class="card card-body" on:submit|preventDefault={handleSubmit}>
        <h1 class="text-center">Add Tasks</h1>
        <div class="mb-5">
          <label for="title"class="fs-5">Title :</label>
          <input
            type="text"
            bind:value={task.title}
            name="title"
            placeholder="write a title"
            class="form-control"
          />
        </div>
        <div class="mb-5">
          <label for="description" class="fs-5">Description :</label>
          <textarea
            name="description"
            bind:value={task.description}
            id="description"
            class="form-control"
          />
        </div>
        <div>
          <button class="btn btn-danger">Save!</button>
        </div>
      </form>
    </div>
    <div class="col-md-6">
      {#each listTask as tasks}
      <div class="card card-body mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <h5>{tasks.title}</h5>
          <i class="fa-regular fa-pen-to-square fs-3" on:click={() => fillTask(tasks)}></i>
        </div>
        <p>{tasks.description}</p>
        <div>
          <button class="btn btn-danger" on:click={() => deleteTask(tasks.id)}>Delete</button>
        </div>
      </div>
      {/each}
    </div>
  </div>
</div>


<style>
</style>
