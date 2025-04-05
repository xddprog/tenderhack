# services/albert_training_service.py

import warnings
warnings.filterwarnings('ignore')

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from transformers import AlbertTokenizer, AlbertForSequenceClassification, DataCollatorWithPadding
from torch.optim import AdamW
from torch.utils.data import DataLoader
from datasets import Dataset
import torch

class AlbertTrainingService:
    def __init__(self):
        self.data = pd.read_csv('albert_data.csv')
        print(self.data.head())
        print(self.data.columns)
        self.data.columns = list(map(str.lower, self.data.columns))
        print(self.data.columns)
        self.unique_values = self.data.label.value_counts()
        plt.xticks(rotation=10)
        sns.barplot(self.unique_values)
        print(self.data[self.data.label == 'Нерелевантный запрос'])
        self.albert_tokenizer = AlbertTokenizer.from_pretrained("albert-base-v2")
        self.albert_model = AlbertForSequenceClassification.from_pretrained("albert-base-v2", num_labels=len(self.unique_values))
        print(f'num_classes: {len(self.unique_values)}')
        for i, row in enumerate(self.unique_values.index):
            print(f'{i} - {row}')
        self.convert_dict = {
            'Вопросы по базе знаний': 0,
            'Техническая поддержка': 1,
            'Нерелевантный запрос': 2
        }
        self.data['label_id'] = self.data.label.apply(lambda row: self.convert_dict[row])
        print(self.data.head())
        
        self.dataset = Dataset.from_pandas(self.data)
        self.tokenized_dataset = self.dataset.map(self.tokenize_function, batched=True)
        self.tokenized_dataset = self.tokenized_dataset.rename_column('label_id', 'labels')
        self.tokenized_dataset = self.tokenized_dataset.rename_column('label', 'label_decoded')
        self.tokenized_dataset.set_format('torch', columns=['input_ids', 'attention_mask', 'labels'])
        print(self.tokenized_dataset)
        
        self.train_test = self.tokenized_dataset.train_test_split(test_size=0.2)
        self.train_dataset = self.train_test['train']
        self.eval_dataset = self.train_test['test']
        self.data_collator = DataCollatorWithPadding(self.albert_tokenizer)
        self.train_dataloader = DataLoader(self.train_dataset, batch_size=16, shuffle=True, collate_fn=self.data_collator)
        self.eval_dataloader = DataLoader(self.eval_dataset, batch_size=16, collate_fn=self.data_collator)
        print(self.train_dataloader.dataset, self.eval_dataloader.dataset)
        
        self.optimizer = AdamW(self.albert_model.parameters(), lr=2e-5)
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.albert_model.to(self.device)
        self.save_directory = "./albert_finetuned"

    def tokenize_function(self, examples):
        return self.albert_tokenizer(examples['query'], truncation=True, max_length=128)

    def train_model(self):
        num_epochs = 15
        for epoch in range(num_epochs):
            self.albert_model.train()
            total_train_loss = 0
            for batch in self.train_dataloader:
                batch = {k: v.to(self.device) for k, v in batch.items()}
                outputs = self.albert_model(**batch)
                loss = outputs.loss
                total_train_loss += loss.item()
                self.optimizer.zero_grad()
                loss.backward()
                self.optimizer.step()
            avg_train_loss = total_train_loss / len(self.train_dataloader)
            print(f'Epoch {epoch+1}, Train Loss: {avg_train_loss:.4f}')

            self.albert_model.eval()
            total_eval_accuracy = 0
            for batch in self.eval_dataloader:
                batch = {k: v.to(self.device) for k, v in batch.items()}
                with torch.no_grad():
                    outputs = self.albert_model(**batch)
                    logits = outputs.logits
                    predictions = torch.argmax(logits, dim=-1)
                    labels = batch['labels']
                    accuracy = (predictions == labels).float().mean()
                    total_eval_accuracy += accuracy.item()
            avg_eval_accuracy = total_eval_accuracy / len(self.eval_dataloader)
            print(f'Epoch {epoch+1}, Eval Accuracy: {avg_eval_accuracy:.4f}')

    def save_model_and_data(self):
        self.albert_model.save_pretrained(self.save_directory)
        self.albert_tokenizer.save_pretrained(self.save_directory)
        self.model = AlbertForSequenceClassification.from_pretrained(self.save_directory)
        self.tokenizer = AlbertTokenizer.from_pretrained(self.save_directory)
        self.data.to_csv('albert_data_formatted.csv')

# Пример использования
if __name__ == "__main__":
    trainer = AlbertTrainingService()
    trainer.train_model()
    trainer.save_model_and_data()