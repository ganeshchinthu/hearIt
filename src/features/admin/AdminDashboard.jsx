import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../../ui/Button";
import styles from "./AdminDashboard.module.css";
import { deleteProfile, getAllProfiles } from "../../services/serverOperations";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dialog from "../../ui/Dialog";
import Logout from "../../ui/Logout";
import Error from "../../ui/Error";

function stat(data) {
  const statObj = data?.reduce(
    (acc, curr) => {
      if (curr.role === "user") acc.user += 1;
      if (curr.role === "moderator") acc.moderator += 1;
      if (curr.role === "admin") acc.admin += 1;

      return acc;
    },
    { user: 0, moderator: 0, admin: 0 }
  );

  return statObj;
}

function AdminDashboard() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["profiles"],
    queryFn: getAllProfiles,
  });
  const navigate = useNavigate();

  if (isError) return <Error>Error loading data</Error>;

  if (isPending) return <Spinner />;

  const statObj = stat(data?.profiles);
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Dashboard</h3>
        <div className={styles.statContainer}>
          <p className={styles.count}>Users: {statObj.user}</p>
          <p className={styles.count}>Moderators: {statObj.moderator}</p>
          <p className={styles.count}>Admins: {statObj.admin}</p>
        </div>
        <Button onClick={() => navigate("/admin/createuser")}>Add user</Button>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userHeader}>
          <span className={styles.userHeaderHeading}>Username</span>
          <span className={styles.userHeaderHeading}>Status</span>
          <span className={styles.userHeaderHeading}>Role</span>
          <span className={styles.userHeaderHeading}>Action</span>
        </div>
        {data.profiles.map((data) => {
          return <UserData profile={data} key={data.id} />;
        })}
      </div>
      <Logout />
    </div>
  );
}

function UserData({ profile }) {
  const role = profile.role;
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDialog() {
    setIsDialogOpen((state) => !state);
  }

  const { mutate: onDelete } = useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: ["profiles"],
      });
    },
  });

  async function handleDeleteProfile() {
    await onDelete(profile.id);
  }

  return (
    <div className={styles.user}>
      <span className={styles.username}>{profile.username}</span>
      <span className={styles.status}>{profile.status}</span>
      <span className={styles.role}>{profile.role}</span>

      <div className={styles.btnsContainer}>
        <Button
          onClick={() => navigate(`/admin/userstatus/${profile.id}`)}
          size="1.6rem"
          p=".4rem .8rem"
          disabled={role === "admin"}
        >
          Edit
        </Button>
        <Button
          size="1.6rem"
          p=".4rem .8rem"
          bgColor="red"
          disabled={role === "admin"}
          onClick={handleDialog}
        >
          Delete
        </Button>
        {isDialogOpen && (
          <Dialog onCancel={handleDialog} onDelete={handleDeleteProfile}>
            all user data will be deleted
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
