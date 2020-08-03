// import { Timestamp } from "../db/index";

export const newParticipant = (
  activityId,
  title,
  image,
  toUser,
  id,
  fromUser
) => ({
  activityId: activityId,
  title: title,
  image: image,
  allowedParticipants: [fromUser, toUser],
  joinedPeople: [],
  toUser: toUser,
  fromUser: fromUser,
  fromConfirmation: id,
  // createdAt: this.props.firebase.firestore.Timestamp.fromDate(new Date()),
});

export const newMessage = (
  fromUser,
  name,
  organiserName,
  organiserAvatar,
  title
) => ({
  isRead: false,
  type: "welcome",
  text: `Hello ${name}, thank you for signing up for this activity. See you soon!`,
  cta: "", //click to action
  toUser: fromUser,
  fromUser: {
    name: organiserName,
    avatar: organiserAvatar,
  },
  activityTitle: title,
});
