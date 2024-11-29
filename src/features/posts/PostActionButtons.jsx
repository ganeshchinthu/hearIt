import Delete from "../../ui/Delete";
import Dialog from "../../ui/Dialog";
import Edit from "../../ui/Edit";

function PostActionButtons({
  currentUser,
  post,
  onEdit,
  isDialogOpen,
  handleDialog,
  handleDelete,
}) {
  // Determine if the user can edit the post
  const canEdit = () => {
    if (currentUser.role === "user" && currentUser.id === post.profile.id)
      return true; // Users can edit their own posts
    if (currentUser.role === "moderator" && currentUser.id === post.profile.id)
      return true; // Moderators can edit their own posts
    if (currentUser.role === "admin" && currentUser.id === post.profile.id)
      return true; // Admins can edit their own posts

    return false; // No other edits allowed
  };

  // Determine if the user can delete the post
  const canDelete = () => {
    if (currentUser.id === post.profile.id) return true; // all type of Users can delete their own posts

    if (currentUser.role === "user" && currentUser.id !== post.profile.id)
      return false; // users cannot delete other users posts

    if (currentUser.role === "moderator") {
      if (post.profile.role === "user") return true; // Moderators can delete user posts

      if (post.profile.role === "admin") return false; // moderators cannot delete admin posts

      if (
        post.profile.role === "moderator" &&
        currentUser.id !== post.profile.id
      )
        return false; // Moderators cannot delete other moderator posts
    }

    if (currentUser.role === "admin") {
      if (post.profile.role === "user" || post.profile.role === "moderator")
        return true; // Admins can delete users and moderators
      if (post.profile.role === "admin" && currentUser.id !== post.profile.id)
        return false; // Admins cannot delete posts from other admins
    }

    return false; // no further deletes allowed
  };

  return (
    <>
      {canEdit() && <Edit onClick={onEdit} />}
      {canDelete() && <Delete onClick={handleDialog} />}
      {isDialogOpen && (
        <Dialog onDelete={handleDelete} onCancel={handleDialog}>
          post will be deleted
        </Dialog>
      )}
    </>
  );
}

export default PostActionButtons;
