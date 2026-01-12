import { useMemo, useState } from "react";
import Header from "./Header";
import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import Button from "./Button";

const MOVIE_OPTIONS = [
  {
    value: "avatar",
    title: "Avatar",
    year: 2009,
    director: "James Cameron",
  },
  {
    value: "inception",
    title: "Inception",
    year: 2010,
    director: "Christopher Nolan",
  },
  {
    value: "interstellar",
    title: "Interstellar",
    year: 2014,
    director: "Christopher Nolan",
  },
  {
    value: "shawshank",
    title: "The Shawshank Redemption",
    year: 1994,
    director: "Frank Darabont",
  },
  {
    value: "pulp-fiction",
    title: "Pulp Fiction",
    year: 1994,
    director: "Quentin Tarantino",
  },
  {
    value: "parasite",
    title: "Parasite",
    year: 2019,
    director: "Bong Joon-ho",
  },
];

function MovieSurveyForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    favoriteMovie: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "โปรดใส่ชื่อของคุณ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "โปรดใส่อีเมลของคุณ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!formData.favoriteMovie) {
      newErrors.favoriteMovie = "กรุณาเลือกหนังที่คุณชอบ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
      handleReset();
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      favoriteMovie: "",
      comments: "",
    });
    setErrors({});
  };

  const handleNewSurvey = () => {
    setSubmittedData(null);
    handleReset();
  };

  const selectedMovie = useMemo(
    () => MOVIE_OPTIONS.find((m) => m.value === submittedData?.favoriteMovie),
    [submittedData]
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden">
        <Header />

        {!submittedData ? (
          <form onSubmit={handleSubmit} className="p-6">
            <FormField
              label="ชื่อ"
              name="name"
              type="text"
              placeholder="กรุณากรอกชื่อของคุณ"
              required
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

            <FormField
              label="อีเมล"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <RadioGroup
              label="เลือกหนังที่คุณชอบ"
              name="favoriteMovie"
              options={MOVIE_OPTIONS}
              value={formData.favoriteMovie}
              onChange={handleChange}
              required
              error={errors.favoriteMovie}
            />

            <FormField
              label="ความคิดเห็นเกี่ยวกับหนัง"
              name="comments"
              type="textarea"
              placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
              value={formData.comments}
              onChange={handleChange}
            />

            <div className="flex gap-4 justify-end mt-8">
              <Button
                type="button"
                variant="secondary"
                onClick={handleReset}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                }
              >
                รีเซ็ต
              </Button>
              <Button
                type="submit"
                variant="primary"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                }
              >
                ส่งแบบสำรวจ
              </Button>
            </div>
          </form>
        ) : (
          <div className="p-6">
            <div className="border border-green-200 rounded-lg bg-green-50 p-5 text-sm text-gray-800">
              <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                ส่งแบบสำรวจสำเร็จ!
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">ชื่อ:</span>
                  <span className="font-medium">{submittedData.name}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">อีเมล:</span>
                  <span className="font-medium">{submittedData.email}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-600 w-24">หนังที่เลือก:</span>
                  <span className="font-medium text-purple-700">
                    {selectedMovie ? selectedMovie.title : "-"}
                  </span>
                </div>
                <hr className="my-2 border-gray-200" />
                <div className="space-y-1">
                  <div className="text-gray-600">ความคิดเห็น:</div>
                  <div className="bg-white border border-gray-200 rounded-md p-3 min-h-[56px]">
                    {submittedData.comments || "-"}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                type="button"
                variant="secondary"
                onClick={handleNewSurvey}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                }
              >
                ทำแบบสำรวจใหม่
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieSurveyForm;
