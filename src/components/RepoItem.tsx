import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonModal,
  IonContent,
  IonInput,
  IonButton
} from '@ionic/react';
import { useState } from 'react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { deleteRepository, updateRepository } from '../services/GithubService';

interface Props {
  repo: RepositoryItem;
  onRefresh: () => void;
}

const RepoItem: React.FC<Props> = ({ repo, onRefresh }) => {

  const [showModal, setShowModal] = useState(false);
  const [newDescription, setNewDescription] = useState(repo.description || '');

  const handleDelete = async () => {
    await deleteRepository(repo.owner!, repo.name);
    onRefresh();
  };

  const handleEdit = async () => {
    if (!newDescription.trim()) return;

    await updateRepository(
      repo.owner!,
      repo.name,
      { description: newDescription }
    );

    setShowModal(false);
    onRefresh();
  };

  return (
    <>
      <IonItemSliding>

        <IonItem>
          <IonThumbnail slot="start">
            <img
              src={
                repo.imageUrl ||
                'https://i.pinimg.com/1200x/c3/ed/2f/c3ed2f5af094903b5ed3bae8e9180800.jpg'
              }
              alt={repo.name}
            />
          </IonThumbnail>

          <IonLabel>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p>Propietario: {repo.owner}</p>
            <p>Lenguaje: {repo.language}</p>
          </IonLabel>
        </IonItem>

        <IonItemOptions side="end">
          <IonItemOption color="danger" onClick={handleDelete}>
            Eliminar
          </IonItemOption>

          <IonItemOption color="primary" onClick={() => setShowModal(true)}>
            Editar
          </IonItemOption>
        </IonItemOptions>

      </IonItemSliding>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonContent className="ion-padding">
          <h2>Editar repositorio</h2>

          <IonInput
            label="Descripción"
            value={newDescription}
            onIonChange={e => setNewDescription(e.detail.value!)}
          />

          <IonButton expand="block" onClick={handleEdit}>
            Guardar cambios
          </IonButton>

          <IonButton
            expand="block"
            color="medium"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default RepoItem;
