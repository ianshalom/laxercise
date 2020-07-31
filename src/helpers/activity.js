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
  toUser,
  name,
  organiserName,
  organiserAvatar,
  title
) => ({
  isRead: false,
  type: "welcome",
  text: `Hello ${name}, please sign up for activity as soon as possible`,
  cta: "", //click to action
  toUser: toUser,
  fromUser: {
    name: organiserName,
    avatar: organiserAvatar,
  },
  activityTitle: title,
  // activityLink: `/activity/${activity.id}`,
  // createdAt: this.props.firebase.firestore.Timestamp.fromDate(new Date()),
});
