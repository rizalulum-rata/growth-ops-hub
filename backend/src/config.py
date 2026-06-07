from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    qdrant_url: str
    qdrant_api_key: str
    qdrant_collection_name: str = "growth_ops_hub"
    db_name: str = "dashboard"
    db_user: str = "postgres"
    db_password: str
    db_host: str = "127.0.0.1"
    db_port: int = 5432
    cors_origins: str = "http://localhost:5500,http://127.0.0.1:5500,https://rizalulum-rata.github.io"
    
    # DeepSeek configuration
    deepseek_api_key: str
    deepseek_base_url: str = "https://api.deepseek.com/v1"
    deepseek_model: str = "deepseek-chat"
    deepseek_max_tokens: int = 2048

    @property
    def database_url(self) -> str:
        return f"postgresql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"

    @property
    def cors_origins_list(self) -> list:
        return [o.strip() for o in self.cors_origins.split(",")]

    class Config:
        env_file = ".env"

settings = Settings()
