import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import MonacoEditor from '../Editor/MonacoEditor';

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
function CardForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const editorContent = watch('body');

  // MonacoEditorからのデータをリアクティブに更新
  useEffect(() => {
    register('body');  // フォームコントロールとして body を登録
  }, [register]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/cards', { card: data });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl min-w-0 m-[30px] p-[20px]">
      <div className="card-body ">
        <h1 className="card-title">カード作成</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <h2 className="form-label">カードのタイトル</h2>
            <input
              type="text"
              {...register('title', { required: true })}  // titleフィールドを登録
              className="form-control textarea textarea-bordered textarea-xs w-full max-w-xs"
            />
          </div>
          <div className="flex">
            <div className="container">
              <label className="form-label">コードブロック</label>
              <MonacoEditor
                value={editorContent}
                onChange={(newValue) => setValue('body', newValue, { shouldValidate: true })}
                language="ruby"
              />
            </div>
            <div className="container">
              <label className="form-label">コードの解答</label>
              <textarea
                {...register('answer')}  // answerフィールドを登録
                className="form-control textarea textarea-bordered textarea-xs w-full max-w-xs"
              />
            </div>
          </div>

          <div>
            <label className="form-label">備考</label>
            <textarea
              {...register('remarks')}  // remarksフィールドを登録
              className="form-control textarea textarea-bordered textarea-lg w-full w-2/3"
            />
          </div>

          <button type="submit" className="btn btn-outline btn-info">保存する</button>
        </form>
      </div>
    </div>
  );
}

export default CardForm;