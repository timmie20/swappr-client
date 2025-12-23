/**
 * Model API Endpoints
 * 
 * Service layer for model-related API calls.
 */

import { api } from '../client';
import type {
  Model,
  CreateModelDto,
  UpdateModelDto,
  PaginatedResponse,
  PaginationParams,
  ApiResponse,
} from '../types';

export const modelEndpoints = {
  /**
   * Get all models (paginated)
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Model>> {
    const { data } = await api.get<PaginatedResponse<Model>>('/models', {
      params,
    });
    return data;
  },

  /**
   * Get models by brand ID
   */
  async getByBrand(
    brandId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Model>> {
    const { data } = await api.get<PaginatedResponse<Model>>(
      `/brands/${brandId}/models`,
      { params }
    );
    return data;
  },

  /**
   * Get a single model by ID
   */
  async getById(id: string): Promise<Model> {
    const { data } = await api.get<ApiResponse<Model>>(`/models/${id}`);
    return data.data;
  },

  /**
   * Get a single model by slug
   */
  async getBySlug(slug: string): Promise<Model> {
    const { data } = await api.get<ApiResponse<Model>>(`/models/slug/${slug}`);
    return data.data;
  },

  /**
   * Create a new model (admin only)
   */
  async create(dto: CreateModelDto): Promise<Model> {
    const { data } = await api.post<ApiResponse<Model>>('/models', dto);
    return data.data;
  },

  /**
   * Update a model (admin only)
   */
  async update(id: string, dto: UpdateModelDto): Promise<Model> {
    const { data } = await api.patch<ApiResponse<Model>>(`/models/${id}`, dto);
    return data.data;
  },

  /**
   * Delete a model (admin only)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/models/${id}`);
  },
};
