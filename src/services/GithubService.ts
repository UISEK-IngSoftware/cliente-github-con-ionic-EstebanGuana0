import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/UserInfo';

const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(
            `${GITHUB_API_URL}/user/repos`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                },
                params: {
                    per_page: 100,
                    sort: 'created',
                    direction: 'desc',
                    affiliation: 'owner',
                }
            }
        );

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ?? null,
            owner: repo.owner?.login ?? null,
            language: repo.language ?? null,
        }));

        return repositories;

    } catch (error) {
        console.error('Hubo un error al obtener repositorios:', error);
        return [];
    }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await axios.post(
            `${GITHUB_API_URL}/user/repos`,
            repo,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                }
            }
        );

        console.log('Repositorio creado:', response.data);

    } catch (error) {
        console.error('Error al crear repositorio:', error);
    }
};

export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await axios.get(
            `${GITHUB_API_URL}/user`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_API_TOKEN}`,
                }
            }
        );

        const user: UserInfo = {
            login: response.data.login,
            name: response.data.name,
            bio: response.data.bio,
            avatar_url: response.data.avatar_url,
        };

        return user;

    } catch (error) {
        console.error('Error al obtener la informacion del usuario:', error);

        return {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se pudo obtener la informacion del usuario',
            avatar_url: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
        };
    }
};
