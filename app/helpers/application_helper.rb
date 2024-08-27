module ApplicationHelper
  class CustomMarkdownRenderer < Redcarpet::Render::HTML
    def block_code(code, language)
      language = language.blank? ? :plaintext : language.split(':').first
      highlighted_code = CodeRay.scan(code, language).div

      # daisyUI の mockup-code コンポーネント形式でラップ
      formatted_code = highlighted_code.lines.each_with_index.map do |line, index|
        # "<pre data-prefix=\"#{index + 1}\"><code>#{line.chomp}</code></pre>"
        "<pre><code>#{line.chomp}</code></pre>"
      end.join

      "<div class=\"mockup-code bg-base-200 text-base-content\">#{formatted_code}</div>"
    end
  end

  def markdown_to_html(text)
    renderer = CustomMarkdownRenderer.new(with_toc_data: true)
    extensions = {
      autolink: true,
      no_intra_emphasis: true,
      fenced_code_blocks: true,
      space_after_headers: true,
      strikethrough: true
    }
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(text).html_safe
  end
end

