import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [questions, setQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem('discussionQuestions') || '[]')
  })

  const [selectedId, setSelectedId] = useState(null)
  const [title, setTitle] = useState('')
  const [question, setQuestion] = useState('')
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('discussionQuestions', JSON.stringify(questions))
  }, [questions])

  const selectedQuestion = questions.find(q => q.id === selectedId)

  function submitQuestion(e) {
    e.preventDefault()

    if (!title.trim() || !question.trim()) return

    const newQuestion = {
      id: Date.now(),
      title: title.trim(),
      question: question.trim(),
      responses: [],
      resolved: false
    }

    setQuestions(prev => [newQuestion, ...prev])
    setTitle('')
    setQuestion('')
    setSelectedId(null)
  }

  function submitResponse(e) {
    e.preventDefault()

    if (!name.trim() || !comment.trim()) return

    const newResponse = {
      id: Date.now(),
      name: name.trim(),
      comment: comment.trim()
    }

    setQuestions(prev =>
      prev.map(q =>
        q.id === selectedId
          ? { ...q, responses: [...q.responses, newResponse] }
          : q
      )
    )

    setName('')
    setComment('')
  }

  function resolveQuestion() {
    setQuestions(prev =>
      prev.map(q =>
        q.id === selectedId ? { ...q, resolved: true } : q
      )
    )
  }

  function deleteQuestion(id) {
    setQuestions(prev => prev.filter(q => q.id !== id))

    if (selectedId === id) {
      setSelectedId(null)
    }
  }

  const filteredQuestions = questions.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.question.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="portal">
      <header>Discussion Portal</header>

      <div className="main">

        {/* LEFT PANE */}
        <div className="left">
          <div className="leftTop">
            <button onClick={() => setSelectedId(null)}>
              New Question
            </button>

            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <div className="questionList">
            {filteredQuestions.map(q => (
              <div
                className={`questionBox ${selectedId === q.id ? 'active' : ''}`}
                key={q.id}
                onClick={() => setSelectedId(q.id)}
              >
                <div className="questionInfo">
                  <h3>{q.title}</h3>
                  <p>{q.question}</p>

                  {q.resolved && (
                    <span className="resolvedTag">Resolved</span>
                  )}
                </div>

                <button
                  className="deleteBtn"
                  onClick={e => {
                    e.stopPropagation()
                    deleteQuestion(q.id)
                  }}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANE */}
        <div className="right">

          {!selectedQuestion ? (

            <form className="questionForm" onSubmit={submitQuestion}>
              <h2>Welcome to Discussion Portal !</h2>
              <p>Enter a subject and question to get started</p>

              <input
                type="text"
                placeholder="Subject"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Question"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                required
              />

              <button type="submit">Submit</button>
            </form>

          ) : (

            <div className="detailPage">

              {/* QUESTION */}
              <div className="questionDetail">
                <h2>Question</h2>
                <h3>{selectedQuestion.title}</h3>
                <p>{selectedQuestion.question}</p>

                {selectedQuestion.resolved ? (
                  <span className="resolvedMessage">
                    ✓ This question is resolved
                  </span>
                ) : (
                  <button className="resolveBtn" onClick={resolveQuestion}>
                    Resolve
                  </button>
                )}
              </div>

              {/* RESPONSES */}
              <h3 className="responseHeading">Responses</h3>

              <div className="responses">
                {selectedQuestion.responses.map(response => (
                  <div className="responseBox" key={response.id}>
                    <h4>{response.name}</h4>
                    <p>{response.comment}</p>
                  </div>
                ))}

                {selectedQuestion.responses.length === 0 && (
                  <p className="empty">No responses yet.</p>
                )}
              </div>

              {/* RESPONSE FORM */}
              {!selectedQuestion.resolved && (
                <form className="responseForm" onSubmit={submitResponse}>
                  <h3>Add Response</h3>

                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />

                  <textarea
                    placeholder="Enter Comment"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    required
                  />

                  <button type="submit">Submit</button>
                </form>
              )}

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default App