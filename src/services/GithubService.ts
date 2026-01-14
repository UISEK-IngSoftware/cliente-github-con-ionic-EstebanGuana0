import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/UserInfo';
import AuthServices from './AuthService';

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

// INTERCEPTOR DE AUTENTICACIÓN
// Se ejecuta antes de cada petición.
// Agrega el token para permitir DELETE y PATCH.

githubApi.interceptors.request.use((config) => {
    const authHeader = AuthServices.getAuthHeaders();
    if (authHeader) {
        config.headers.Authorization = authHeader;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// OBTENER REPOSITORIOS
// Se usa para listar y refrescar los datos
// después de eliminar o editar un repositorio.
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get(`/user/repos`, {
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
            }
        });

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ?? null,
            owner: repo.owner?.login ?? null, // Se usa para identificar el repo en DELETE y PATCH
            // imageUrl: repo.owner?.avatar_url ?? null,
            language: repo.language ?? null,
        }));

        return repositories;
    } catch (error) {
        console.error('Hubo un error al obtener repositorios:', error);
        return [];
    }
};

// =====================
// CREAR REPOSITORIO
// =====================
export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await githubApi.post(`/user/repos`, repo);
        console.log('Repositorio creado:', response.data);
    } catch (error) {
        console.error('Error al crear repositorio:', error);
    }
};


// ELIMINAR REPOSITORIO (DELETE)
// Elimina un repositorio usando owner y nombre.

export const deleteRepository = async (
    owner: string,
    repoName: string
): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repoName}`);
        console.log('Repositorio eliminado');
    } catch (error) {
        console.error('Error al eliminar repositorio:', error);
    }
};

// EDITAR REPOSITORIO (PATCH)
// Actualiza la descripción del repositorio.

export const updateRepository = async (
    owner: string,
    repoName: string,
    updatedRepo: Partial<RepositoryItem>
): Promise<void> => {
    try {
        await githubApi.patch(
            `/repos/${owner}/${repoName}`,
            {
                // CAMBIO: solo se envía description
                description: updatedRepo.description,
            },
            {
                headers: {
                    Accept: 'application/vnd.github+json',
                },
            }
        );
        console.log('Repositorio actualizado');
    } catch (error) {
        console.error('Error al actualizar repositorio:', error);
    }
};

// =====================
// OBTENER INFORMACIÓN DEL USUARIO
// =====================
export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get(`/user`);
        return response.data as UserInfo;
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
