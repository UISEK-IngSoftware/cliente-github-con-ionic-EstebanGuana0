import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList } from '@ionic/react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList> 
          <RepoItem name="android-project"
            imageUrl='https://media.tenor.com/5dNe3mEYY0wAAAAe/gato-gato-sacando-la-lengua.png' 
            />
            <RepoItem name="ios-project"
            imageUrl='https://cdn-icons-png.flaticon.com/512/226/226770.png?w=360' 
            />
            <RepoItem name="ionic-project"
            imageUrl='https://cdn-icons-png.flaticon.com/512/226/226770.png?w=360' 
            />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
