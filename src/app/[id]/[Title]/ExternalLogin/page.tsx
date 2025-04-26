import Header from '@/app/components/Header/Header';
import LoginForm from './LoginForm';
import TopSlider from '@/app/components/TopSlider/TopSlider';
import JournalNav from '@/app/components/InnerMenu/JournalNav';

export default function LoginPage() {
  return (
    <>
    <TopSlider/>
    <Header/>
    <JournalNav/>
    <LoginForm/>
    </>
);
}
