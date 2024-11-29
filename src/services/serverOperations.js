export async function getAllPosts() {
  const res = await fetch(`/posts`);
  const data = await res.json();

  return data;
}

export async function getAllProfiles() {
  const res = await fetch(`/profiles`);
  const data = await res.json();

  return data;
}

export async function getProfilePosts(id) {
  const res = await fetch(`/profiles/${id}/posts`);
  const data = await res.json();

  return data;
}

export async function getPost(id) {
  const res = await fetch(`/posts/${id}`);
  const data = await res.json();

  console.log(data);

  return data;
}
export async function getProfile(id) {
  const res = await fetch(`/profiles/${id}`);
  const data = await res.json();

  console.log(data);

  return data;
}

export async function deleteProfile(id) {
  const res = await fetch(`/profiles/delete/${id}`, {
    method: "DELETE",
  });

  return res.status;
}

export async function login(data) {
  const res = await fetch("/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401 || res.status === 404) {
    const err = await res.json();
    throw new Error(err.message);
  }

  console.log(res);
  const user = await res.json();

  return user;
}

export async function newUser(data) {
  const res = await fetch("/newuser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 409) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const user = await res.json();

  return user;
}

export async function createUser(data) {
  const res = await fetch("/admin/createuser", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 409) {
    const err = await res.json();
    throw new Error(err.message);
  }

  const user = await res.json();

  return user;
}

export async function createPost(post) {
  const res = await fetch("/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application.json",
    },
  });

  const data = await res.json();

  return data;
}

export async function deletePost(id) {
  const res = await fetch(`/posts/delete/${id}`, {
    method: "DELETE",
  });

  return res.status;
}

export async function updatePost(updatedPost, id) {
  const res = await fetch(`/posts/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedPost),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}
export async function updateProfile(updatedProfile, id) {
  const res = await fetch(`/profiles/update/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updatedProfile),
    headers: {
      "Content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
}

export async function adminLogin(data) {
  const res = await fetch("/profile/admin", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 404 || res.status === 401 || res.status === 403) {
    const err = await res.json();
    throw new Error(err.message);
  }

  return res.json();
}
