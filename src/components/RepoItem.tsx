import { IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';


const RepoItem: React.FC<{repo:RepositoryItem}> = ({ repo}) => {
  return (
    <IonItem>
        <IonThumbnail slot="start">
        <img src={repo.imageUrl|| "https://i.pinimg.com/originals/2a/97/20/2a972054847bc3f0412083ac13871873.gif"} alt={repo.name} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
          <p>Propietario: {repo.owner}</p>
          <p>Lenguaje:{repo.language}</p>
        </IonLabel>
    </IonItem>
  );
};

export default RepoItem;
