require "redcarpet"
require "coderay"
module CardsHelper
  class DaisyUICodeRayify < Redcarpet::Render::HTML
    def block_code(code, language)
      # CodeRayでシンタックスハイライトを適用
      code = CodeRay.scan(code, language || :plaintext).div
      # DaisyUIのコードブロック形式に合わせて加工
      code_lines = code.lines
      formatted_code = code_lines.map.with_index(1) do |line, index|
        "<pre data-prefix=\"#{index}\"><code>#{line}</code></pre>"
      end.join
      "<div class=\"mockup-code bg-base-200\">#{formatted_code}</div>"
    end
  end
  

  def markdown_to_html_with_daisyui(text)
    renderer = DaisyUICodeRayify.new(filter_html: true, hard_wrap: true)
    extensions = {
      fenced_code_blocks: true,
      no_intra_emphasis: true,
      autolink: true,
      disable_indented_code_blocks: true,
      strikethrough: true
    }
    markdown = Redcarpet::Markdown.new(renderer, extensions)
    markdown.render(text).html_safe
  end
end