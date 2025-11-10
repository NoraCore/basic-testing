import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    const mockAxiosInstance: Partial<AxiosInstance> = {
      get: mockGet,
    };
    mockedAxios.create.mockReturnValue(mockAxiosInstance as AxiosInstance);
  });

  afterEach(() => {
    mockGet.mockReset();
  });

  test('should create instance with provided base url', async () => {
    const relativePath = '/posts';
    mockGet.mockResolvedValue({ data: {} });
    await throttledGetDataFromApi(relativePath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const relativePath = '/posts/1';
    const responseData = { data: { id: 1, title: 'Test' } };
    mockGet.mockResolvedValue(responseData);

    await throttledGetDataFromApi(relativePath);
    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = { id: 42, title: 'Hello' };
    mockGet.mockResolvedValue({ data: mockData });

    const result = await throttledGetDataFromApi('/todos/42');

    expect(result).toEqual(mockData);
  });
});
