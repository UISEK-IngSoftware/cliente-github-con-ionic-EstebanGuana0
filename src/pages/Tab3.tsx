import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
         <IonCard>
      <img alt="Silhouette of mountains" src="https://media0.giphy.com/media/v1.Y2lkPWFlZWNjYzExeTlhZTgydmMzamVjbXF2bHh3NjBpNDIxeXZzbWtidHl4eHV1dDdscSZlcD12MV9naWZzX2dpZklkJmN0PWc/2zUn8hAwJwG4abiS0p/200.gif" />
      <IonCardHeader>
        <IonCardTitle>Esteban Guaña</IonCardTitle>
        <IonCardSubtitle>HOLA SOY UNA NIÑA</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Soy un estudiante de quinto semestre de informatica</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
