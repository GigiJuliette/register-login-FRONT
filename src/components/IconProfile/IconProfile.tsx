import icon0 from "../../assets/profile/iconProfile0.jpg";
import icon1 from "../../assets/profile/iconProfile1.jpg";
import icon2 from "../../assets/profile/iconProfile2.jpg";
import icon3 from "../../assets/profile/iconProfile3.jpg";
import icon4 from "../../assets/profile/iconProfile4.jpg";
import icon5 from "../../assets/profile/iconProfile5.jpg";
interface IconProfileProps {
  iconIndex: number;
  className?: string;
}
const IconProfile = ({ iconIndex, className }: IconProfileProps) => {
  const icons = [icon0, icon1, icon2, icon3, icon4, icon5];

  return <img src={icons[iconIndex]} key={iconIndex} className={className} />;
};
export default IconProfile;
