import { FontAwesome } from "@expo/vector-icons";
export default function getStars(rating) {
  const num = Math.floor(rating);
  const dec = rating - num;
  let tab = [];

  for (let i = 0; i < num; i++) {
    tab.push(<FontAwesome name="star" size={15} color="orange" key={i} />);
  }
  if (dec) {
    tab.push(
      <FontAwesome
        name="star-half-full"
        size={15}
        color="orange"
        key={tab.length}
      />
    );
  }

  return tab;
}
